<?php
 
namespace App\Services;
 
use Illuminate\Support\Facades\Http;

class BookService
{
    public function list($request)
    {

        $response = Http::get('https://www.anapioficeandfire.com/api/books?name='.$request->name);
 
        return $response->json();
    }
    
}