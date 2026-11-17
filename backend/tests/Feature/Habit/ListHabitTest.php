<?php

namespace Tests\Feature\Habit;

use App\Models\Habits\Habit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListHabitTest extends TestCase
{
    use RefreshDatabase;

    private const URL = '/api/habit/list';
    public function test_lista_apenas_os_usuarios_logados(): void {
        $user = User::factory()->create();
        $outro = User::factory()->create();

        $meu = Habit::factory()->for($user)->create();
        Habit::factory()->for($outro)->create();

        $this->actingAs($user)->getJson(self::URL)
            ->assertOk()
            ->assertJsonCount(1, 'habits')
            ->assertJsonPath('habits.0.uuid', $meu->uuid);
    }

    public function test_retorna_lista_vazia_quando_usuario_nao_tem_habitos(): void {
        $user = User::factory()->create();

        $this->actingAs($user)->getJson(self::URL)
            ->assertOk()
            ->assertJsonCount(0, 'habits');
    }

    public function test_se_usuario_nao_autenticado_recebe_401(): void {
        $this->getJson(self::URL)->assertUnauthorized();
    }

    public function test_check_in_today_indica_se_foi_marcado_hoje(): void {
        $user = User::factory()->create();

        $marcado = Habit::factory()->for($user)->create(['name' => 'A']);

        Habit::factory()->for($user)->create(['name' => 'B']);

        $marcado->checkIns()->create([
            'user_id' => $user->id,
            'check_in_date' => today()->toDateString(),
            'completed_at' => now(),
        ]);

        $this->actingAs($user)->getJson(self::URL)
            ->assertOK()
            ->assertJsonPath('habits.0.check_in_today', true)
            ->assertJsonPath('habits.1.check_in_today', false);
    }
}