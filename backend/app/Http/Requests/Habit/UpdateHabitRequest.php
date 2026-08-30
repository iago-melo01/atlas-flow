<?php

namespace App\Http\Requests\Habit;

use App\Enums\CadenceType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHabitRequest extends FormRequest{
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
             'name' => ['sometimes', 'string', 'max:255'],
             'description' => ['sometimes', 'nullable', 'string', 'max:255'],
             'icon' => ['sometimes', 'string', 'max:16'],
             'cadence_type' => ['sometimes', 'string', Rule::in(CadenceType::values())],
             'cadence_config' => ['sometimes', 'nullable', 'array'],

             'cadence_config.days_of_week' => ['required_if:cadence_type,weekly', 'array', 'min:1', 'max:7'],
             'cadence_config.days_of_week.*' => ['integer', 'between:0,6', 'distinct'],

             'cadence_config.times_per_week' => ['required_if:cadence_type,custom', 'integer', 'between:1,7' ],
         ];
     }
 
     public function messages(): array
     {
         return [
             'name.string' => 'O nome deve ser um texto',
             'name.max' => 'O nome deve ter no máximo 255 caracteres',

             'description.string' => 'A descrição deve ser um texto',
             'description.max' => 'A descrição deve ter no máximo 255 caracteres',

             'icon.string' => 'O ícone deve ser um texto',
             'icon.max' => 'O ícone deve ter no máximo 16 caracteres',

             'cadence_type.string' => 'A cadência deve ser um texto',
             'cadence_type.in' => 'A cadência deve ser diária, semanal ou personalizada',

             'cadence_config.array' => 'A configuração da cadência deve ser um objeto',

             'cadence_config.days_of_week.required_if' => 'Escolha pelo menos um dia da semana',
             'cadence_config.days_of_week.array' => 'Os dias da semana devem ser uma lista',
             'cadence_config.days_of_week.min' => 'Escolha pelo menos um dia da semana',
             'cadence_config.days_of_week.max' => 'Escolha no máximo 7 dias da semana',

             'cadence_config.days_of_week.*.integer' => 'Cada dia da semana deve ser um número',
             'cadence_config.days_of_week.*.between' => 'Cada dia da semana deve estar entre 0 (domingo) e 6 (sábado)',
             'cadence_config.days_of_week.*.distinct' => 'Não repita o mesmo dia da semana',

             'cadence_config.times_per_week.required_if' => 'Informe quantas vezes na semana',
             'cadence_config.times_per_week.integer' => 'A quantidade de vezes na semana deve ser um número',
             'cadence_config.times_per_week.between' => 'Informe entre 1 e 7 vezes na semana',
         ];
     }
}