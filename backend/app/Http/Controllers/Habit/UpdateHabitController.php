<?php
namespace App\Http\Controllers\Habit;
use App\Http\Controllers\Controller;
use App\Http\Requests\Habit\UpdateHabitRequest;
use App\Models\Habits\Habit;
use App\Services\Habit\HabitService;
use Illuminate\Support\Facades\Auth;

class UpdateHabitController extends Controller  {

    public function __construct(protected HabitService $habitService){}

    public function update(UpdateHabitRequest $request, Habit $habit) 
    {
        $data = $request->validated();

        $this->habitService->update($habit, $data);

        return response()->json([
            'message' => 'Hábito atualizado com sucesso',
            'habit' => $habit,
        ]);
    }
    
}