<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    protected $table = 'modules';

            protected $fillable = [
                'course_id',
                'title',
                'order_index',
                'status',
            ];
}
