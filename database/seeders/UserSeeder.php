<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        
        DB::insert("INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
        (1, 'masinis', 'masinis.official@gmail.com', NULL, '$2y\$12\$rRdwMdjF6oDI5AJmHrWzdOf0NirNu53eWZ1YSGEkf4H8PhcDE2jpu', NULL, '2024-09-23 19:12:54', '2024-09-23 19:12:54');");

    }
}
