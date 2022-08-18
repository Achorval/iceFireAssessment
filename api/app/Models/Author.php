<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Author extends Model
{
    use HasFactory;

    /**
     * @var array
     *
     */
    protected $fillable = ['name'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * Author's books
     *
     * @return void
     */
    public function books()
    {
    	// return $this->belongsToMany('App\Models\Book');
        return $this->belongsToMany(Book::class,'book_authors');
            // ->using(BookAuthor::class);
    }
}
