<?php

namespace App\Http\Controllers\API;

use App\Models\Metode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MetodeResource;
use Illuminate\Support\Facades\Validator;

class MetodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $metode = Metode::all();

        return response()->json([
            'success' => true,
            'message' => 'Data metode berhasil diambil',
            'data' => MetodeResource::collection($metode),
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'metode' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada kesalahan',
                'data' => $validator->errors()
            ]);
        }

        $metode = Metode::create([
            'metode' => $request->metode,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sukses create Data',
            'data' => $metode,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $metode = Metode::find($id);

        if (!$metode) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'metode' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal melakukan update data!',
                'data' => $validator->errors()
            ]);
        }

        $metode->metode = $request->input('metode');

        $metode->save();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Update Data'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $metode = Metode::find($id);

        if (!$metode) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }


        $metode->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Hapus Data'
        ]);
    }
}
