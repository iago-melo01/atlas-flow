<?php

namespace App\Http\Requests\HabitTemplate;

use App\Enums\CadenceType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateHabitTemplateRequest extends FormRequest{
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
             
         ];
     }
 
     public function messages(): array
     {
         return [
         ];
     }
}