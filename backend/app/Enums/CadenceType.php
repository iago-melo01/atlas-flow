<?php

namespace App\Enums;

enum CadenceType: string
{
    case DAILY = 'daily';
    case WEEKLY = 'weekly';
    case CUSTOM = 'custom';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match($this){
            self::DAILY => 'Diário',
            self::WEEKLY => 'Semanal',
            self::CUSTOM => 'Personalizado',
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