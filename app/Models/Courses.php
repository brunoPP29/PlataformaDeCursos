<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $table = 'courses';
            protected $fillable = [
                'instructor_id',
                'title',
                'description',
                'category',
                'price',
                'cover_url',
                'status'
            ];
}
