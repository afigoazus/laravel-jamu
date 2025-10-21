<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('product_name')
                    ->label('Nama Produk')
                    ->required()
                    ->minLength(3)
                    ->maxLength(255),
                TextInput::make('price')
                    ->label('Harga Produk')
                    ->required()
                    ->prefix('Rp')
                    ->mask(RawJs::make('$money($input)'))
                    ->dehydrateStateUsing(fn (?string $state): ?string => preg_replace('/[^0-9]/', '', $state)),
                FileUpload::make('img_path')
                    ->label('Gambar Produk')
                    ->image()
                    ->maxSize(5120)
                    ->directory('products')
                    ->required()
                    ->validationMessages([
                        'max' => 'Ukuran gambar tidak boleh lebih dari 5 MB.',
                    ]),
                Repeater::make('composition')
                    ->label('Daftar Komposisi')
                    ->schema([
                        TextInput::make('ingredient')
                            ->label('Komposisi')
                            ->required()
                            ->minLength(3)
                            ->maxLength(255),
                    ])
                    ->addActionLabel('Tambah Komposisi')
                    ->columnSpanFull()
                    ->required(),
                Textarea::make('benefits')
                    ->label('Khasiat Produk')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull()
                    ->required()
            ]);
    }
}
