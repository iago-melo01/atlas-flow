<?php


namespace App\Models\Habits;


use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'habit_id', 'user_id', 'check_in_date', 'completed_at'])]
class HabitCheckIns extends Model
{
    use HasUuid;

    public function habits(){
        return $this->belongsTo(Habit::class, 'habit_id', 'id');
    }
}
