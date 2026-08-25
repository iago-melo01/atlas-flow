<?php

namespace Database\Seeders;

use App\Enums\CadenceType;
use App\Models\Habits\HabitTemplate;
use Illuminate\Database\Seeder;

class HabitTemplateSeeder extends Seeder
{
    /**
     * Templates sugeridos: o MVP deixa o usuário montar a rotina a partir de bases prontas.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Beber água',
                'description' => 'Beber água ao longo do dia.',
                'icon' => '💧',
                'cadence_type' => CadenceType::DAILY->value,
                'cadence_config' => null,
            ],
            [
                'name' => 'Treinar',
                'description' => 'Treino de força três vezes na semana.',
                'icon' => '🏋️',
                'cadence_type' => CadenceType::WEEKLY->value,
                'cadence_config' => ['days_of_week' => [1, 3, 5]],
            ],
            [
                'name' => 'Ler',
                'description' => 'Ler pelo menos 20 minutos.',
                'icon' => '📚',
                'cadence_type' => CadenceType::DAILY->value,
                'cadence_config' => null,
            ],
            [
                'name' => 'Meditar',
                'description' => 'Meditar alguns dias na semana.',
                'icon' => '🧘',
                'cadence_type' => CadenceType::CUSTOM->value,
                'cadence_config' => ['times_per_week' => 4],
            ],
            [
                'name' => 'Dormir cedo',
                'description' => 'Estar na cama até as 23h.',
                'icon' => '😴',
                'cadence_type' => CadenceType::DAILY->value,
                'cadence_config' => null,
            ],
        ];

        foreach ($templates as $template) {
            HabitTemplate::query()->updateOrCreate(
                ['name' => $template['name']],
                $template + ['is_active' => true],
            );
        }
    }
}
