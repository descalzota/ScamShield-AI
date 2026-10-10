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
        Schema::create('model_releases', function (Blueprint $table) {
            $table->id();
            $table->string('version')->unique();
            $table->string('model_name');
            $table->string('model_url');
            $table->string('tokenizer_url');
            $table->string('sha256', 64);
            $table->unsignedBigInteger('file_size');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_releases');
    }
};
