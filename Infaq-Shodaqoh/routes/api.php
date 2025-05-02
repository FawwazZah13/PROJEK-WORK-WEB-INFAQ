<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BayarController;
use App\Http\Controllers\API\BuktiController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\BulansController;
use App\Http\Controllers\API\MetodeController;
use App\Http\Controllers\API\RayonsController;
use App\Http\Controllers\API\SiswasController;
use App\Http\Controllers\API\KategoriController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//LOGIN
Route::post('/login', [UsersController::class, 'login']);

// TB BULAN
Route::get('/bulan', [BulansController::class, 'index']);

Route::get('/payment/unpaid/{id}', [BayarController::class, 'checkUnpaidMonths']);
Route::get('/bulan/{id}', [BayarController::class, 'getBulanBySiswa']);

//search data siswa di dashboard admin
Route::get('/search/siswa', [SiswasController::class, 'search']);

Route::get('/rayon', [RayonsController::class, 'index']);

Route::post('/midtrans/callback', [BayarController::class, 'handleCallback']);


Route::middleware('auth:sanctum')->group(function () {
    //LOGOUT 
    Route::post('/logout', [UsersController::class, 'logout']);
    
    Route::get('/siswa', [SiswasController::class, 'index']);
    Route::get('/siswa-profile/{id}', [SiswasController::class, 'show']);

    //get data di dashboard admin berdasarkan dropdown rayon yang dipilih
    Route::get('/admin/{rayon}/siswa', [SiswasController::class, 'getStudentsByRayon']);

    // TB SISWA
    Route::get('/siswa-ps', [SiswasController::class, 'indexPs']);
    Route::get('/search/siswa/ps', [SiswasController::class, 'searchPs']);

    //TB BUKTI 
    Route::get('/bukti', [BuktiController::class, 'index']);

    //TB BUKTI 
    Route::get('/bayar', [BayarController::class, 'index']);
    Route::get('/data-bayar', [BayarController::class, 'getDataBayar']);
    Route::get('/users', [UsersController::class, 'index']);


    //TB SISWA
    Route::post('/siswa', [SiswasController::class, 'create']);
    Route::put('/siswa/{id}', [SiswasController::class, 'update']);
    Route::delete('/siswa/{id}', [SiswasController::class, 'destroy']);

    //TB RAYON
    Route::post('/rayon', [RayonsController::class, 'create']);
    Route::put('/rayon/{id}', [RayonsController::class, 'update']);
    Route::delete('/rayon/{id}', [RayonsController::class, 'destroy']);
    Route::get('/by/rayon', [RayonsController::class, 'getByRayon']);
    Route::get('/jumlah-infaq', [RayonsController::class, 'jumlahInfaqRayon']);

    //TB BUKTI
    // Route::post('/bukti/{id_bayar}', [BuktiController::class, 'create']);
    Route::post('/upload-pembayaran/{id_bayar}', [BuktiController::class, 'uploadPembayaran']);
    Route::delete('/bukti/{id}', [BuktiController::class, 'destroy']);
    // Route::put('/bukti/{id}', [BuktiController::class, 'update']);


    //TB BAYAR
    Route::post('/bayar', [BayarController::class, 'create']);
    Route::put('/bayar/{id}', [BayarController::class, 'update']);
    Route::delete('/bayar/{id}', [BayarController::class, 'destroy']);
    Route::get('/bulan-belum-bayar/{nis}', [BayarController::class, 'getBulanBelumDibayar']);


    //ADMIN
    Route::post('/users', [UsersController::class, 'create']);
    Route::post('/users/{id}', [UsersController::class, 'update']);
    Route::delete('/users/{id}', [UsersController::class, 'destroy']);

});