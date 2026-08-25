<?php

namespace Database\Seeders;

use App\Models\Habits\Habit;
use App\Models\Habits\HabitCheckIn;
use App\Models\User;
use Illuminate\Database\Seeder;

class HabitCheckInSeeder extends Seeder
{
    /**
     * Check-ins recentes para o tester exercitar histórico/streak depois.
     * A unique (habit_id, check_in_date) impede duplicar no re-seed.
     */
    public function run(): void
    {
        $tester = User::query()->where('email', UserSeeder::TESTER_EMAIL)->firstOrFail();

        $water = Habit::query()
            ->where('user_id', $tester->id)
            ->where('name', 'Beber água')
            ->firstOrFail();

        $reading = Habit::query()
            ->where('user_id', $tester->id)
            ->where('name', 'Ler')
            ->firstOrFail();

        foreach (range(0, 2) as $daysAgo) {
            $date = now()->subDays($daysAgo)->toDateString();

            $this->upsertCheckIn($water, $tester, $date);
        }

        $this->upsertCheckIn($reading, $tester, now()->toDateString());
    }

    private function upsertCheckIn(Habit $habit, User $user, string $date): void
    {
        HabitCheckIn::query()->updateOrCreate(
            [
                'habit_id' => $habit->id,
                'check_in_date' => $date,
            ],
            [
                'user_id' => $user->id,
                'completed_at' => $date.' 08:30:00',
            ],
        );
    }
}
