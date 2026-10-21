<?php

namespace App\Policies\Habits;

use App\Models\Habits\HabitTemplate;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HabitTemplatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, HabitTemplate $habitTemplate): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, HabitTemplate $habitTemplate): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, HabitTemplate $habitTemplate): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, HabitTemplate $habitTemplate): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, HabitTemplate $habitTemplate): bool
    {
        return false;
    }
}
