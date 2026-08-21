<?php

namespace App\Services\Habit;

use App\Models\Habits\Habit;
use Illuminate\Support\Facades\DB;
class HabitService{
    public function create(array $data): Habit {
        DB::transaction(function () use ($data) { 
            return Habit::create($data);
        });
    }
}