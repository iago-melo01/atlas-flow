<?php

namespace App\Services\HabitTemplate;

use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class HabitTemplateService{
    public function create(array $data): Collection {

        return DB::transaction( function () use ($data){
            return Habit::create($data);
        });
    }

    public function listAll(){
        return HabitTemplate::all()
        ->where('is_active', true);
    }
    
    public function delete(HabitTemplate $template){
        $template->delete();
    }
}