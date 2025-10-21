<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

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

    protected static function booted()
    {
        parent::booted();

        static::deleted(function ($product) {
            if ($product->img_path) {
                Storage::disk('public')->delete($product->img_path);
            }
        });
    }
}
