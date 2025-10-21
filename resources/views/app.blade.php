<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Masinis</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <link rel="stylesheet" href="{{ asset('css/filament/filament/app.css') }}">
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>