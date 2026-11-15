<?php

namespace App\Services\Habit;
use App\Enums\CadenceType;
use App\Models\Habits\Habit;
use App\Models\Habits\HabitCheckIn;
use App\Models\Habits\HabitTemplate;
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
            ->withExists([ //verifica se o relacionamento existe e adiciona um 
                           //atributo Booleano às instâncias dos models retornados 
                'checkIns as check_in_today' => fn ($q) => $q->where('check_in_date', today()->toDateString())
            ])
            ->orderBy('name')
            ->get();
    }

    public function create(array $data): Habit
    {
        $template_uuid = Arr::pull($data, 'habit_template_uuid');

        if($template_uuid){
            $data['habit_template_id'] = HabitTemplate::query()
            ->where('uuid', $template_uuid)
            ->value('id');
        }

        return DB::transaction(function () use ($data) {
            return Habit::create($data);
        });
    }

    public function update(Habit $habit, array $data): Habit
    {
        if(Arr::hasAny($data, ['cadence_config', 'cadence_type'])){ // existe algum cadence pra ser updated?
            $cadenceType = isset($data['cadence_type']) //cadence_type está setado?
                ? CadenceType::from($data['cadence_type']) // se sim, retorna o cadence_type equivalente ao valor setado
                : $habit->cadence_type; //se não, utiliza o cadence já salvo no sistema

            $config = array_key_exists('cadence_config', $data) // cadence_config foi enviado? (mesmo que null)
                ? $data['cadence_config'] //se sim, atribui
                : $habit->cadence_config;

            $data['cadence_config'] = $cadenceType->normalizeConfig($config);
        }

        $habit->update($data);

        return $habit;
    }

    public function destroy(Habit $habit){
        $habit->delete();
    }

    public function checkIn(Habit $habit, int $userId): HabitCheckIn {
        //o first or create primeiro verifica se existe um registro igual, se sim, não cria nada
        // o parametro attributes[] vai ser usado para identificar se o registro existe
        return $habit->checkIns()->firstOrCreate(
            ['check_in_date' => today()->toDateString()],

            //esse segundo parâmetro abaixo, são os dados extra que serão adicionados a instancia do $habit para a criação do novo registro de checkin
            //caso não seja encontrado registro com os dados dos $attributes[]
            ['user_id' => $userId, 'completed_at' => now()],

            );
    }

    public function uncheck(Habit $habit): void 
    {
        $habit->checkIns()->whereDate('check_in_date', today())->delete();
    }
}
