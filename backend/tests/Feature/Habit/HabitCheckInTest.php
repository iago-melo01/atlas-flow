<?php

namespace Tests\Feature\Habit;

use App\Models\Habits\Habit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HabitCheckInTest extends TestCase
{
    use RefreshDatabase;

    private function url(Habit $habit): string
    {
        return "/api/habit/{$habit->uuid}/checkin";
    }

    private function checkInEm(Habit $habit, string $date): void
    {
        $habit->checkIns()->create([
            'user_id' => $habit->user_id,
            'check_in_date' => $date,
            'completed_at' => now(),
        ]);
    }

    public function test_faz_check_in_de_hoje(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->postJson($this->url($habit))
            ->assertCreated();

        $this->assertDatabaseHas('habit_check_ins', [
            'habit_id' => $habit->id,
            'user_id' => $user->id,
            'check_in_date' => today()->toDateString(),
        ]);
    }

    public function test_check_in_repetido_no_mesmo_dia_nao_duplica(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->postJson($this->url($habit));
        $this->actingAs($user)->postJson($this->url($habit));

        $this->assertDatabaseCount('habit_check_ins', 1);
    }

    public function test_check_in_em_dias_diferentes_cria_registros_separados(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->postJson($this->url($habit));
        $this->travel(1)->days();
        $this->actingAs($user)->postJson($this->url($habit));

        $this->assertDatabaseCount('habit_check_ins', 2);
    }

    public function test_desmarca_apenas_o_check_in_de_hoje(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();
        $this->checkInEm($habit, today()->subDay()->toDateString());
        $this->checkInEm($habit, today()->toDateString());

        $this->actingAs($user)->deleteJson($this->url($habit))
            ->assertNoContent();

        $this->assertDatabaseCount('habit_check_ins', 1);
        $this->assertDatabaseHas('habit_check_ins', [
            'check_in_date' => today()->subDay()->toDateString(),
        ]);
    }

    public function test_desmarcar_sem_check_in_retorna_204(): void
    {
        $user = User::factory()->create();
        $habit = Habit::factory()->for($user)->create();

        $this->actingAs($user)->deleteJson($this->url($habit))
            ->assertNoContent();
    }

    public function test_nao_pode_fazer_check_in_em_habito_de_outro_usuario(): void
    {
        $habit = Habit::factory()->create();
        $intruso = User::factory()->create();

        $this->actingAs($intruso)->postJson($this->url($habit))
            ->assertForbidden();

        $this->assertDatabaseCount('habit_check_ins', 0);
    }

    public function test_nao_pode_desmarcar_check_in_de_outro_usuario(): void
    {
        $habit = Habit::factory()->create();
        $this->checkInEm($habit, today()->toDateString());
        $intruso = User::factory()->create();

        $this->actingAs($intruso)->deleteJson($this->url($habit))
            ->assertForbidden();

        $this->assertDatabaseCount('habit_check_ins', 1);
    }

    public function test_habito_inexistente_retorna_404(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/api/habit/00000000-0000-0000-0000-000000000000/checkin')
            ->assertNotFound();
    }

    public function test_usuario_nao_autenticado_recebe_401(): void
    {
        $habit = Habit::factory()->create();

        $this->postJson($this->url($habit))->assertUnauthorized();
        $this->deleteJson($this->url($habit))->assertUnauthorized();
    }
}
