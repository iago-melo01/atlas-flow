<?php


namespace App\Models\Habits;

use App\Models\User;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'habit_id', 'user_id', 'check_in_date', 'completed_at'])]
class HabitCheckIn extends Model
{
    use HasUuid;

    protected function casts(): array
    {
        return [
            'check_in_date' => 'date',
            'completed_at' => 'datetime',
        ];
    }

    public function habit(){
        return $this->belongsTo(Habit::class, 'habit_id', 'id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
