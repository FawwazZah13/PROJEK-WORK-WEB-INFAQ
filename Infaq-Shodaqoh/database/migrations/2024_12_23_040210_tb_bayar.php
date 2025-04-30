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
        Schema::create('tb_bayar', function (Blueprint $table) {
            $table->id('id');
            $table->integer('siswa_id');
            $table->integer('bulan_id');
            $table->integer('bukti_id');
            $table->string('upload_pembayaran');
            $table->string('order_id');
            $table->enum('kategori', ['infaq shodaqoh','zakat mal']);
            $table->enum('metode', ['qris','tf','cash']);
            $table->enum('status_pay', ['capture', 'pending', 'cancel', 'expire', 'refund', 'failure','paid']);
            $table->string('redirect_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_bayar');
    }
};
