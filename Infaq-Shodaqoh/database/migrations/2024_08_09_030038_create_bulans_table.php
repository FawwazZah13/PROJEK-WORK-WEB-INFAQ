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
        Schema::create('tb_bulan', function (Blueprint $table) {
            $table->id('id');
            $table->enum('nama_bulan', [
                'Juli', 
                'Agustus', 
                'September',
                'Oktober',
                'November',
                'Desember',
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'juni',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_bulan');
    }
};
