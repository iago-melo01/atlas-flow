<?php

namespace App\Models\Habits;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'name', 'descricao', 'icon', 'cadence_type', 'cadence_config', 'is_active'])]
class HabitTemplate extends Model
{
    use HasUuid;

    public function habits(){
        return $this->hasMany(Habit::class);
    }
}
