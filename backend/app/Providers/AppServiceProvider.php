<?php

namespace App\Providers;

use App\Models\Habits\Habit;
use App\Models\Habits\HabitTemplate;
use App\Policies\Habits\HabitPolicy;
use App\Policies\Habits\HabitTemplatePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Habit::class, HabitPolicy::class);
        Gate::policy(HabitTemplate::class, HabitTemplatePolicy::class);
    }
}
