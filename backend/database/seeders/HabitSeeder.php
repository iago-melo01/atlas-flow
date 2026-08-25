<?php

namespace Database\Seeders;

use App\Enums\CadenceType;
use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use App\Models\User;
use Illuminate\Database\Seeder;

class HabitSeeder extends Seeder
{
    /**
     * Hábitos do tester cobrem daily/weekly/custom + um inativo (a listagem filtra is_active).
     * A segunda conta existe para conferir isolamento por user_id.
     */
    public function run(): void
    {
        $tester = User::query()->where('email', UserSeeder::TESTER_EMAIL)->firstOrFail();
        $other = User::query()->where('email', UserSeeder::OTHER_EMAIL)->firstOrFail();

        $water = HabitTemplate::query()->where('name', 'Beber água')->firstOrFail();
        $workout = HabitTemplate::query()->where('name', 'Treinar')->firstOrFail();
        $reading = HabitTemplate::query()->where('name', 'Ler')->firstOrFail();

        $this->upsertHabit($tester, [
            'name' => $water->name,
            'description' => $water->description,
            'icon' => $water->icon,
            'cadence_type' => $water->cadence_type,
            'cadence_config' => $water->cadence_config,
            'habit_template_id' => $water->id,
            'is_active' => true,
        ]);

        $this->upsertHabit($tester, [
            'name' => $workout->name,
            'description' => $workout->description,
            'icon' => $workout->icon,
            'cadence_type' => $workout->cadence_type,
            'cadence_config' => $workout->cadence_config,
            'habit_template_id' => $workout->id,
            'is_active' => true,
        ]);

        $this->upsertHabit($tester, [
            'name' => $reading->name,
            'description' => $reading->description,
            'icon' => $reading->icon,
            'cadence_type' => $reading->cadence_type,
            'cadence_config' => $reading->cadence_config,
            'habit_template_id' => $reading->id,
            'is_active' => true,
        ]);

        $this->upsertHabit($tester, [
            'name' => 'Meditar',
            'description' => 'Cinco minutos de respiração.',
            'icon' => '🧘',
            'cadence_type' => CadenceType::CUSTOM,
            'cadence_config' => ['times_per_week' => 4],
            'habit_template_id' => null,
            'is_active' => true,
        ]);

        $this->upsertHabit($tester, [
            'name' => 'Diário antigo',
            'description' => 'Hábito desativado para testar o filtro da listagem.',
            'icon' => '📓',
            'cadence_type' => CadenceType::DAILY,
            'cadence_config' => null,
            'habit_template_id' => null,
            'is_active' => false,
        ]);

        $this->upsertHabit($other, [
            'name' => 'Caminhar',
            'description' => 'Caminhada de 30 minutos.',
            'icon' => '🚶',
            'cadence_type' => CadenceType::DAILY,
            'cadence_config' => null,
            'habit_template_id' => null,
            'is_active' => true,
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function upsertHabit(User $user, array $attributes): Habit
    {
        return Habit::query()->updateOrCreate(
            [
                'user_id' => $user->id,
                'name' => $attributes['name'],
            ],
            $attributes,
        );
    }
}
