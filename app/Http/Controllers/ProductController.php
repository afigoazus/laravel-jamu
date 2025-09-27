<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index() {
        $product = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->product_name,
                'price' => $product->price,
                'image_url' => $product->img_path ? asset('storage/'. $product->img_path) : null,
                'composition' => $product->composition,
                'benefits' => $product->benefits,
            ];
        });

        return Inertia::render('Home', [
            'products' => $product,
        ]);
    }
}
