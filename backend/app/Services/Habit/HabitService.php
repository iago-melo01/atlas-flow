<?php

namespace App\Services\Habit;

use App\Models\Habits\Habit;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class HabitService
{
    public function list(int $userId): Collection
    {
        return Habit::query()
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
    }

    public function create(array $data): Habit
    {
        return DB::transaction(function () use ($data) {
            return Habit::create($data);
        });
    }
}
