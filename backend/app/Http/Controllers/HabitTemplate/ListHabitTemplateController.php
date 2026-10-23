<?php

namespace App\Http\Controllers\HabitTemplate;

use App\Http\Controllers\Controller;

use App\Models\Habits\HabitTemplate;

use App\Services\HabitTemplate\HabitTemplateService;

class ListHabitTemplateController extends Controller
{
    public function __construct(protected HabitTemplateService $habitTemplateService) {}

    public function list()
    {
        $this->authorize('viewAny', HabitTemplate::class);

        $habitTemplateList = $this->habitTemplateService->listAll();
        
        return response()->json([
            'habit_templates' => $habitTemplateList,
        ], 200);
    }
}
