<?php

namespace App\Http\Requests\Habit;

use App\Enums\CadenceType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateHabitRequest extends FormRequest{
     /**
     * Determine if the user is authorized to make this request.
     */
     public function authorize(): bool
     {
         return true;
     }
     /**
      * Get the validation rules that apply to the request.
      *
      * @return array<string, ValidationRule|array<mixed>|string>
      */
     public function rules(): array
     {
         return [
             'name' => ['required', 'string', 'max:255'],
             'habit_template_uuid' => ['nullable', 'exists:habit_templates,uuid'],
             'description' => ['required', 'string', 'max:255'],
             'icon' => ['required', 'string', 'max:16' ],
             'cadence_type' => ['required', 'string', Rule::in(CadenceType::values())],
             'cadence_config' => ['nullable', 'array'],
             
             'cadence_config.days_of_week' => ['required_if:cadence_type,weekly', // se o cadence_type for igual a 'weekly'
             'array', 'min:1', 'max:7'],

             'cadence_config.days_of_week.*' => ['integer', 'between:0,6', 'distinct'],

             'cadence_config.times_per_week' => ['required_if:cadence_type,custom', 'integer', 'between:1,7'],

         ];
     }
 
     public function messages(): array
     {
         return [
             
         ];
     }
}