<?php
namespace App\Http\Controllers\Habit;
use App\Http\Controllers\Controller;
use App\Services\Habit\HabitService;
use Illuminate\Support\Facades\Auth;

class ListHabitController extends Controller  {

    public function __construct(protected HabitService $habitService){}

    public function list(){
        
        $habits = $this->habitService->list(Auth::id());

        return response()->json([
            'habits' => $habits
        ], 200);
    }
}