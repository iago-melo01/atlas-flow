<?php

namespace App\Services\HabitTemplate;

use App\Enums\CadenceType;
use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HabitTemplateService{
    
    public function create(array $data): HabitTemplate {
        return HabitTemplate::create($data);
    }

    public function listAll(){
        return HabitTemplate::query()
        ->where('is_active', true)
        ->get();
    }
    
    public function delete(HabitTemplate $template){
        $template->delete();
    }

    public function update(HabitTemplate $template, array $data): HabitTemplate
    {
        if (Arr::hasAny($data, ['cadence_type', 'cadence_config'])) {
            $cadenceType = isset($data['cadence_type'])
                ? CadenceType::from($data['cadence_type'])
                : $template->cadence_type;

            $config = array_key_exists('cadence_config', $data)
                ? $data['cadence_config']
                : $template->cadence_config;

            $data['cadence_config'] = $cadenceType->normalizeConfig($config);
        }

        $template->update($data);

        return $template;
    }
}