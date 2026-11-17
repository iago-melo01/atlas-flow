<?php

namespace Tests\Feature\Habit;

use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class CreateHabitTest extends TestCase
{
    use RefreshDatabase;

    private const URL = '/api/habit/create';

    private function payload(array $override = []): array
    {
        return array_merge([
            'name' => 'Beber água',
            'icon' => '💧',
            'cadence_type' => 'daily',
        ], $override);
    }

    public function test_cria_habito_diario_para_o_usuario_logado(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson(self::URL, $this->payload())
            ->assertCreated()
            ->assertJsonPath('habit.name', 'Beber água');

        $this->assertDatabaseHas('habits', [
            'name' => 'Beber água',
            'user_id' => $user->id,
            'cadence_type' => 'daily',
        ]);
    }

    public function test_cria_habito_semanal_com_dias_da_semana(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson(self::URL, $this->payload([
            'cadence_type' => 'weekly',
            'cadence_config' => ['days_of_week' => [1, 3, 5]],
        ]))->assertCreated();

        $this->assertSame([1, 3, 5], Habit::first()->cadence_config['days_of_week']);
    }

    public function test_cria_habito_personalizado_com_vezes_por_semana(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson(self::URL, $this->payload([
            'cadence_type' => 'custom',
            'cadence_config' => ['times_per_week' => 4],
        ]))->assertCreated();

        $this->assertSame(4, Habit::first()->cadence_config['times_per_week']);
    }

    public function test_vincula_o_template_quando_informado(): void
    {
        $user = User::factory()->create();
        $template = HabitTemplate::create([
            'name' => 'Ler',
            'icon' => '📚',
            'cadence_type' => 'daily',
        ]);

        $this->actingAs($user)->postJson(self::URL, $this->payload([
            'habit_template_uuid' => $template->uuid,
        ]))->assertCreated();

        $this->assertDatabaseHas('habits', ['habit_template_id' => $template->id]);
    }

    public function test_ignora_user_id_enviado_no_corpo(): void
    {
        $user = User::factory()->create();
        $outro = User::factory()->create();

        $this->actingAs($user)->postJson(self::URL, $this->payload([
            'user_id' => $outro->id,
        ]))->assertCreated();

        $this->assertDatabaseHas('habits', ['user_id' => $user->id]);
        $this->assertDatabaseMissing('habits', ['user_id' => $outro->id]);
    }

    #[DataProvider('payloadsInvalidos')]
    public function test_rejeita_payload_invalido(array $override, string $campo): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson(self::URL, $this->payload($override))
            ->assertUnprocessable()
            ->assertJsonValidationErrors($campo);

        $this->assertDatabaseCount('habits', 0);
    }

    public static function payloadsInvalidos(): array
    {
        return [
            'sem nome' => [['name' => null], 'name'],
            'nome muito longo' => [['name' => str_repeat('a', 256)], 'name'],
            'sem ícone' => [['icon' => null], 'icon'],
            'ícone muito longo' => [['icon' => str_repeat('a', 17)], 'icon'],
            'cadência inválida' => [['cadence_type' => 'monthly'], 'cadence_type'],
            'semanal sem dias' => [['cadence_type' => 'weekly'], 'cadence_config.days_of_week'],
            'semanal lista vazia' => [['cadence_type' => 'weekly', 'cadence_config' => ['days_of_week' => []]], 'cadence_config.days_of_week'],
            'dia fora do range' => [['cadence_type' => 'weekly', 'cadence_config' => ['days_of_week' => [7]]], 'cadence_config.days_of_week.0'],
            'dia repetido' => [['cadence_type' => 'weekly', 'cadence_config' => ['days_of_week' => [1, 1]]], 'cadence_config.days_of_week.0'],
            'custom sem vezes' => [['cadence_type' => 'custom'], 'cadence_config.times_per_week'],
            'custom com 0' => [['cadence_type' => 'custom', 'cadence_config' => ['times_per_week' => 0]], 'cadence_config.times_per_week'],
            'custom com 8' => [['cadence_type' => 'custom', 'cadence_config' => ['times_per_week' => 8]], 'cadence_config.times_per_week'],
            'template inexistente' => [['habit_template_uuid' => '00000000-0000-0000-0000-000000000000'], 'habit_template_uuid'],
        ];
    }

    public function test_usuario_nao_autenticado_recebe_401(): void
    {
        $this->postJson(self::URL, $this->payload())->assertUnauthorized();
    }
}
