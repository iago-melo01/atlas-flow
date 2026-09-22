<?php

namespace App\Services\Habit;
use App\Enums\CadenceType;
use App\Models\Habits\Habit;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HabitService
{
    public function list(int $userId): Collection
    {
        return Habit::query()
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
    }

    public function create(array $data): Habit
    {
        return DB::transaction(function () use ($data) {
            return Habit::create($data);
        });
    }

    public function update(Habit $habit, array $data){
        $attributes = $data;
        
        if(Arr::hasAny($attributes, ['cadence_config', 'cadence_type'])){ // existe algum cadence pra ser updated?
            $cadenceType = isset($attributes['cadence_type']) //cadence_type está setado?
                ? CadenceType::from($attributes['cadence_type']) // se sim, retorna o cadence_type equivalente ao valor setado
                : $habit->cadence_type; //se não, utiliza o cadence já salvo no sistema

            $config = array_key_exists('cadence_config', $attributes) // cadence_type está setado?
                ? $attributes['cadence_config'] //se sim, atribui 
                : $habit->cadence_config;
            
            $attributes['cadence_config'] = $this->normalizeCadence($cadenceType, $config);
        }

        return $habit;
    }

    private function normalizeCadence(CadenceType $type, ?array $config ): ?array
    {
        $config ??= [];

        return match ($type){
            CadenceType::DAILY => null,
            
            CadenceType::WEEKLY => [
                Arr::only($config, ['days_of_week'])
            ]


        }
    }

}
