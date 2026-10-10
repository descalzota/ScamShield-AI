<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModelRelease extends Model
{
    protected $fillable = [
        'version',
        'model_name',
        'model_url',
        'tokenizer_url',
        'sha256',
        'file_size',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}