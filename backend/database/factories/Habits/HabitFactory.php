<?php

namespace Database\Factories\Habits;

use App\Enums\CadenceType;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Habits\Habit;
use App\Models\User;

/**
 * @extends Factory<Model>
 */
class HabitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    protected $model = Habit::class;
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->words(2, true),
            'icon' => '💧',
            'is_active' => true,
            'cadence_type' => CadenceType::DAILY,
            'cadence_config' => null
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }

    public function weekly(array $days = [1, 3, 5]): static
    {
        return $this->state([
            'cadence_type' => CadenceType::WEEKLY,
            'cadence_config' => ['days_of_week' => $days],
        ]);
    }

    public function custom(int $times = 3): static
    {
        return $this->state([
            'cadence_type' => CadenceType::CUSTOM,
            'cadence_config' => ['times_per_week' => $times],
        ]);
    }
}
