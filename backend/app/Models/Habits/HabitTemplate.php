<?php

namespace App\Models\Habits;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'name', 'description', 'icon', 'cadence_type', 'cadence_config', 'is_active'])]
class HabitTemplate extends Model
{
    use HasUuid;

    protected function casts(): array
    {
        return [
            'cadence_config' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function habits(){
        return $this->hasMany(Habit::class);
    }
}
