<?php

namespace App\Http\Controllers\HabitCheckIn;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Habit\CreateHabitRequest;
use App\Models\Habits\Habit;
use App\Models\Habits\HabitCheckIn;
use App\Services\Habit\HabitService;
use Illuminate\Http\Request;

class CreateHabitCheckInController extends Controller
{
    public function __construct(protected HabitService $habitService) {}

    public function store(Habit $habit)
    {
        $this->authorize('checkin', $habit);

        $userId = Auth::id();

        $checkIn = $this->habitService->checkIn($habit, $userId);

        return response()->json([
            'message' => 'Check-In feito com sucesso',
            'check_in'=> $checkIn,
        ], 201);
    }
}
