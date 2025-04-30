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
        Schema::create('tb_bukti', function (Blueprint $table) {
            $table->id('id');
            $table->date('tanggal_bayar');
            $table->string('penerima');
            $table->string('paraf');
            $table->string('ttd_ortu');
            $table->boolean('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_bukti');
    }
};
