<?php

namespace App\Http\Controllers\HabitCheckIn;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Habits\Habit;
use App\Models\Habits\HabitCheckIn;
use App\Services\Habit\HabitService;
use Illuminate\Http\Request;

class DeleteHabitCheckInController extends Controller
{
    public function __construct(protected HabitService $habitService) {}

    public function delete(Request $request)
    {
        
    }
}
