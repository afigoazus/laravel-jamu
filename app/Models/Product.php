<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'product_name',
        'price',
        'img_path',
        'composition',
        'benefits'
    ];

    protected $casts = [
        'composition' => 'array',
    ];
}
