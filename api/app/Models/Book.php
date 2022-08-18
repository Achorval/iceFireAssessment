<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Author;

class Book extends Model
{
    use HasFactory;

    /**
     * @var array
     *
     */
    protected $fillable = [
        'name',
        'isbn',
        'country',
        'number_of_pages',
        'release_date',
        'publisher_id'
    ];

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
     * Book's publisher
     *
     * @return void
     */
    public function publisher()
    {
    	return $this->belongsTo('App\Models\Publisher');
    }

    /**
     * Book's authors
     *
     * @return void
     */
    public function authors()
    {
    	// return $this->belongsToMany('App\Models\Author');
        return $this->belongsToMany(Author::class, 'book_authors');
            // ->using(BookAuthor::class);
    }
}
