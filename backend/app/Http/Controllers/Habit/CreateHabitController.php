<?php
namespace App\Http\Controllers\Habit;

use App\Http\Controllers\Controller;
use App\Http\Requests\Habit\CreateHabitRequest;
use App\Services\Habit\HabitService;

class CreateHabitController extends Controller  {

    public function __construct(protected HabitService $habitService){}

    public function store(CreateHabitRequest $request){
        $data = $request->validated();
        $habit = $this->habitService->create($data);

        return response()->json([
            'message' => 'Hábito criado com sucesso',
            'habit' => $habit,
        ], 201);
    }
}