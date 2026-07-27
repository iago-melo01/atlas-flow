<?php


namespace App\Models\Habits;


use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['uuid', 'name', 'user_id', 'habit_template_id', 'descricao', 'icon', 'is_active', 'cadence_type', 'cadence_config'])]
class Habit extends Model
{
    use HasUuid;

    public function habittemplates(){
        return $this->belongsTo(HabitTemplate::class, 'habit_template_id', 'id');
    }
}
