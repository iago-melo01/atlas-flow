<?php

namespace App\Http\Controllers\HabitTemplate;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\HabitTemplate\CreateHabitTemplateRequest;
use App\Models\Habits\HabitTemplate;

use App\Services\HabitTemplate\HabitTemplateService;

class CreateHabitTemplateController extends Controller
{
    public function __construct(protected HabitTemplateService $habitTemplateService) {}

    public function store(CreateHabitTemplateRequest $request)
    {
        $this->authorize('create', HabitTemplate::class);
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $habitTemplate = $this->habitTemplateService->create($data);

        return response()->json([
            'message' => 'Template de hábito criado com sucesso',
            'habit' => $habitTemplate,
        ], 201);
    }
}
