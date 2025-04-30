<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Bulan extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bulan = [
            ['nama_bulan' => 'Januari'],
            ['nama_bulan' => 'Februari'],
            ['nama_bulan' => 'Maret'],
            ['nama_bulan' => 'April'],
            ['nama_bulan' => 'Mei'],
            ['nama_bulan' => 'Juni'],
            ['nama_bulan' => 'Juli'],
            ['nama_bulan' => 'Agustus'],
            ['nama_bulan' => 'September'],
            ['nama_bulan' => 'Oktober'],
            ['nama_bulan' => 'November'],
            ['nama_bulan' => 'Desember'],
        ];

        DB::table('tb_bulan')->insert($bulan);
    }
}
