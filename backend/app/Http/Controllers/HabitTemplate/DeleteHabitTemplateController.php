<?php

namespace App\Http\Controllers\HabitTemplate;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\Models\Habits\HabitTemplate;

use App\Services\HabitTemplate\HabitTemplateService;

class DeleteHabitTemplateController extends Controller
{
    public function __construct(protected HabitTemplateService $habitTemplateService) {}

    public function delete()
    {
        $this->authorize('create', HabitTemplate::class);
        $data['user_id'] = Auth::id();
        $habitTemplate = $this->habitTemplateService->delete();

        return response()->json([
            'message' => 'Template de hábito deletado com sucesso',
            'habit' => $habitTemplate,
        ], 201);
    }
}
