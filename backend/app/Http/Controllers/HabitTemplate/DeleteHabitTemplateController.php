<?php

namespace App\Http\Controllers\HabitTemplate;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\Models\Habits\HabitTemplate;

use App\Services\HabitTemplate\HabitTemplateService;
use Illuminate\Http\Request;

class DeleteHabitTemplateController extends Controller
{
    public function __construct(protected HabitTemplateService $habitTemplateService) {}

    public function delete(HabitTemplate $habitTemplate) // é passado como parametro pq
    // o route binding ja traz ele injetado aq
    {
        $this->authorize('delete', $habitTemplate);
        
        $this->habitTemplateService->delete($habitTemplate);

        return response()->json([
            'message' => 'Template de hábito deletado com sucesso',
        ], 200);
    }
}
