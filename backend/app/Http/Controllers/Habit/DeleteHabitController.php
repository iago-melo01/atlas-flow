<?php

namespace App\Http\Controllers\Habit;
use App\Http\Controllers\Controller;
use App\Models\Habits\Habit;
use App\Services\Habit\HabitService;
use Illuminate\Http\Request;

class DeleteHabitController extends Controller
{
    public function __construct(protected HabitService $habitService){}

    public function delete(Habit $habit){
        $this->authorize('delete', $habit);

        $this->habitService->destroy($habit);

        return response()->json(204);
    }
}
