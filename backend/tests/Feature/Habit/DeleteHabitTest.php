<?php

namespace Tests\Feature\Habit;

use App\Models\Habits\Habit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteHabitTest extends TestCase
{
    use RefreshDatabase;

    private function url(Habit $habit): string
    {
        return "/api/habit/{$habit->uuid}";
    }

    public function test_exclui_o_habito_do_usuario(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->deleteJson($this->url($habit))
            ->assertNoContent();

        $this->assertModelMissing($habit);
    }

    public function test_excluir_habito_apaga_os_check_ins(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();
        $habit->checkIns()->create([
            'user_id' => $user->id,
            'check_in_date' => today()->toDateString(),
            'completed_at' => now(),
        ]);

        $this->actingAs($user)->deleteJson($this->url($habit))->assertNoContent();

        $this->assertDatabaseCount('habit_check_ins', 0);
    }

    public function test_nao_pode_excluir_habito_de_outro_usuario(): void
    {
        $habit = Habit::factory()->create();
        $intruso = User::factory()->create();

        $this->actingAs($intruso)->deleteJson($this->url($habit))
            ->assertForbidden();

        $this->assertModelExists($habit);
    }

    public function test_habito_inexistente_retorna_404(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->deleteJson('/api/habit/00000000-0000-0000-0000-000000000000')
            ->assertNotFound();
    }

    public function test_usuario_nao_autenticado_recebe_401(): void
    {
        $habit = Habit::factory()->create();

        $this->deleteJson($this->url($habit))->assertUnauthorized();

        $this->assertModelExists($habit);
    }
}
