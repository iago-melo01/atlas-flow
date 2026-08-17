<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('habits', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon', 16);
            $table->boolean('is_active')->default(true);
            $table->string('cadence_type')->default('daily');
            $table->json('cadence_config')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')
            ->constrained()// constrained garante que o user_id recebido, existe na tabela users
            ->cascadeOnDelete(); 

            $table->foreignId('habit_template_id')
            ->nullable()
            ->constrained('habit_templates')
            ->nullOnDelete();

            $table->index(['user_id', 'is_active']);
            $table->index('habit_template_id');

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};
