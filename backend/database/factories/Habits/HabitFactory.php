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
}
