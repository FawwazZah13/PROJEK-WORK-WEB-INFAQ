<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\BulansResource;
use App\Models\Bulans;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BulansController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bulan = Bulans::all();

        return response()->json([
            'success' => true,
            'message' => 'Data nama bulan berhasil diambil',
            'data' => BulansResource::collection($bulan),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Bulan $bulan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bulan $bulan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bulan $bulan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bulan $bulan)
    {
        //
    }
}
