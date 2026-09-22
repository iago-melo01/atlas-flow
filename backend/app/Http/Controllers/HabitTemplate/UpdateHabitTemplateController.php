<?php
namespace App\Http\Controllers\HabitTemplate;
use App\Http\Controllers\Controller;
use App\Http\Requests\HabitTemplate\UpdateHabitTemplateRequest;
use App\Models\Habits\Habit;
use App\Services\Habit\HabitService;
use Illuminate\Support\Facades\Auth;
use App\Services\HabitTemplate\HabitTemplateService;
class UpdateHabitTemplateController extends Controller  {

    public function __construct(protected HabitTemplateService $habitTemplateService){}

    public function update(UpdateHabitTemplateRequest $request, Habit $habit) 
    {
        $data = $request->validated();

        $this->habitTemplateService->update($habit, $data);

        return response()->json([
            'message' => 'Hábito atualizado com sucesso',
            'habit' => $habit,
        ]);
    }
    
}