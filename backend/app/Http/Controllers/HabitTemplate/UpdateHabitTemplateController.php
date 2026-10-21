<?php
namespace App\Http\Controllers\HabitTemplate;
use App\Http\Controllers\Controller;
use App\Http\Requests\HabitTemplate\UpdateHabitTemplateRequest;
use App\Models\Habits\HabitTemplate;
use App\Services\HabitTemplate\HabitTemplateService;
class UpdateHabitTemplateController extends Controller  {

    public function __construct(protected HabitTemplateService $habitTemplateService){}

    public function update(UpdateHabitTemplateRequest $request, HabitTemplate $habitTemplate) 
    {
        $data = $request->validated();

        $this->authorize('update', $habitTemplate);
        $this->habitTemplateService->update($habitTemplate, $data);

        return response()->json([
            'message' => 'Template de Hábito atualizado com sucesso',
            'habit_template' => $habitTemplate,
        ]);
    }
    
}