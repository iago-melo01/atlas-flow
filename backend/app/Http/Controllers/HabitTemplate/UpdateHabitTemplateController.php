<?php
namespace App\Http\Controllers\HabitTemplate;
use App\Http\Controllers\Controller;
use App\Http\Requests\HabitTemplate\UpdateHabitTemplateRequest;
use App\Models\Habits\HabitTemplate;
use App\Services\Habit\HabitService;
use Illuminate\Support\Facades\Auth;
use App\Services\HabitTemplate\HabitTemplateService;
class UpdateHabitTemplateController extends Controller  {

    public function __construct(protected HabitTemplateService $habitTemplateService){}

    public function update(UpdateHabitTemplateRequest $request, HabitTemplate $habitTemplate) 
    {
        $data = $request->validated();

        $this->user()->can('update', $this->route('habittemplate'));
        $this->habitTemplateService->update($habitTemplate, $data);

        return response()->json([
            'message' => 'Hábito atualizado com sucesso',
            'habit' => $habitTemplate,
        ]);
    }
    
}