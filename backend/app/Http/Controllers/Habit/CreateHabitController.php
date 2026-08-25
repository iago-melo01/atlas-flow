<?php

namespace App\Http\Controllers\Habit;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Habit\CreateHabitRequest;
use App\Models\Habits\Habit;
use App\Services\Habit\HabitService;

class CreateHabitController extends Controller
{
    public function __construct(protected HabitService $habitService) {}

    public function store(CreateHabitRequest $request)
    {
        $this->authorize('create', Habit::class);
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $habit = $this->habitService->create($data);

        return response()->json([
            'message' => 'Hábito criado com sucesso',
            'habit' => $habit,
        ], 201);
    }
}
