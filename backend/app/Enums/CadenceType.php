<?php

namespace App\Enums;

enum CadenceType: string
{
    case DAILY = 'daily';
    case WEEKLY = 'weekly';
    case MONTHLY = 'monthly';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match($this){
            self::DAILY => 'Diário',
            self::WEEKLY => 'Semanal',
            self::MONTHLY => 'Mensal',
        };    
    }    

    public static function options(): array 
    {
        return collect(self::cases())
        ->map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
        ])->toArray();
    }


}