<?php

namespace App\Http\Controllers\HabitCheckIn;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Habits\Habit;
use App\Services\Habit\HabitService;

class DeleteHabitCheckInController extends Controller
{
    public function __construct(protected HabitService $habitService) {}

    public function delete(Habit $habit)
    {
        $this->authorize('checkin', $habit);

        $this->habitService->uncheck($habit);

        return response()->noContent();
    
    }
}
