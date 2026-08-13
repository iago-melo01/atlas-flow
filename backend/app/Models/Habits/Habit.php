<?php


namespace App\Models\Habits;

use App\Models\User;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'name', 'user_id', 'habit_template_id', 'description', 'icon', 'is_active', 'cadence_type', 'cadence_config'])]
class Habit extends Model
{
    use HasUuid;

    protected function casts(): array
    {
        return [
            'cadence_config' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function habitTemplate(){
        return $this->belongsTo(HabitTemplate::class, 'habit_template_id', 'id');
    }

    public function checkIns(){
        return $this->hasMany(HabitCheckIn::class);
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
