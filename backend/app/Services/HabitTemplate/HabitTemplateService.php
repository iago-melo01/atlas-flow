<?php

namespace App\Services\HabitTemplate;

use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class HabitTemplateService{
    
    public function create(array $data): Collection {
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

    public function update(HabitTemplate $template, array $data){
        $template->update($data);
        return $template;
    }
}