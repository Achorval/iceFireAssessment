<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @param  Model $book
     * @return void
     */
    public function __construct(Book $book)
    {
        $this->model = $book;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function externalBooks(BookService $BookService, Request $request)
    {
        $items = $BookService->list($request);
        return response(['status_code' => '201', 'status' => 'success', 'data' => $items]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = $this->model->with('authors', 'publisher')->get();
        return response(['status_code' => '201', 'status' => 'success', 'data' => $items]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'isbn' => 'required|digits:13|integer|unique:books,isbn',
            'country' => 'required',
            'number_of_pages' => 'required|integer',
            'release_date' => 'required',
            'publisher_id' => 'exists:publishers,id',
            'authors' => 'array',
            'authors.*' => 'exists:authors,id'
        ]);
        $item = $this->model->create($request->all());

        $authors = $request->get('authors');
        $item->authors()->sync($authors);

        return $this->index();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $item = $this->model->with('authors', 'publisher')->findOrFail($id);
            return response(['data' => $item, 'status' => 200]);
        } catch (ModelNotFoundException $e) {
            return response(['message' => 'Item Not Found!', 'status' => 404]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $item = $this->model->with('authors', 'publisher')->findOrFail($id);
            $item->update($request->all());

            $authors = $request->get('authors');
            $item->authors()->sync($authors);

            return response(['data' => $item, 'status' => 200]);
        } catch (ModelNotFoundException $e) {
            return response(['message' => 'Item Not Found!', 'status' => 404]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $item = $this->model->with('authors', 'publisher')->findOrFail($id);
            $item->authors()->detach();
            $item->delete();
            return $this->index();
        } catch (ModelNotFoundException $e) {
            return response(['message' => 'Item Not Found!', 'status' => 404]);
        }
    }
}
