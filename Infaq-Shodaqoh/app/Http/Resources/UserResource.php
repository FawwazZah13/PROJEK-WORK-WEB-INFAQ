<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SiswasResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'role' => $this->role,
            'rayon' => $this->rayon,
        ];
    }
}
