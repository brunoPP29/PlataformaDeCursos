<?php
namespace App\Services;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersService
{
    use HasFactory;
    protected $fillable = [
        'id',
        'cargo',
        'username',
        'email',
        'password',
    ];
    public function __construct()
    {
        
    }
}
