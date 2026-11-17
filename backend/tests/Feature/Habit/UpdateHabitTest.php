<?php

namespace Tests\Feature\Habit;

use App\Models\Habits\Habit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateHabitTest extends TestCase
{
    use RefreshDatabase;

    private function url(Habit $habit): string
    {
        return "/api/habit/{$habit->uuid}";
    }

    public function test_atualiza_apenas_o_nome_sem_mexer_no_resto(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->weekly([1, 2])->create(['icon' => '🏃']);

        $this->actingAs($user)->putJson($this->url($habit), ['name' => 'Correr'])
            ->assertOk();

        $habit->refresh();
        $this->assertSame('Correr', $habit->name);
        $this->assertSame('🏃', $habit->icon);
        $this->assertSame([1, 2], $habit->cadence_config['days_of_week']);
    }

    public function test_troca_de_diario_para_semanal(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->putJson($this->url($habit), [
            'cadence_type' => 'weekly',
            'cadence_config' => ['days_of_week' => [0, 6]],
        ])->assertOk();

        $this->assertSame([0, 6], $habit->refresh()->cadence_config['days_of_week']);
    }

    public function test_trocar_para_semanal_sem_dias_retorna_422(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->putJson($this->url($habit), ['cadence_type' => 'weekly'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('cadence_config.days_of_week');
    }

    public function test_valida_config_usando_o_tipo_ja_salvo(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->weekly()->create();

        $this->actingAs($user)->putJson($this->url($habit), ['cadence_config' => []])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('cadence_config.days_of_week');
    }

    public function test_trocar_para_diario_limpa_o_cadence_config(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->weekly()->create();

        $this->actingAs($user)->putJson($this->url($habit), ['cadence_type' => 'daily'])
            ->assertOk();

        $this->assertNull($habit->refresh()->cadence_config);
    }

    public function test_descarta_chaves_que_nao_pertencem_a_cadencia(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->putJson($this->url($habit), [
            'cadence_type' => 'custom',
            'cadence_config' => ['times_per_week' => 2, 'days_of_week' => [1]],
        ])->assertOk();

        $this->assertSame(['times_per_week' => 2], $habit->refresh()->cadence_config);
    }

    public function test_nao_transfere_o_habito_para_outro_usuario(): void
    {
        $user = User::factory()->create();
        $outro = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->putJson($this->url($habit), ['user_id' => $outro->id])
            ->assertOk();

        $this->assertSame($user->id, $habit->refresh()->user_id);
    }

    public function test_nao_pode_atualizar_habito_de_outro_usuario(): void
    {
        $dono = User::factory()->create();
        $intruso = User::factory()->create();
        $habit = Habit::factory()->for($dono)->create(['name' => 'Original']);

        $this->actingAs($intruso)->putJson($this->url($habit), ['name' => 'Hackeado'])
            ->assertForbidden();

        $this->assertSame('Original', $habit->refresh()->name);
    }

    public function test_habito_inexistente_retorna_404(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->putJson('/api/habit/00000000-0000-0000-0000-000000000000', ['name' => 'X'])
            ->assertNotFound();
    }

    public function test_usuario_nao_autenticado_recebe_401(): void
    {
        $habit = Habit::factory()->create();

        $this->putJson($this->url($habit), ['name' => 'X'])->assertUnauthorized();
    }
}
