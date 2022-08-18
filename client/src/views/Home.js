import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"

function App() {
  const [books, setBooks] = useState([]);

  // ** Get data on mount
  useEffect(() => { 
    axios
    .get("http://127.0.0.1:8000/api/books")
    .then(function (response) {
      setBooks(response.data.data)
      console.log(response.data.data);
    });
  }, []);

  const handleUpdate = (id) => {
    axios
    .delete("http://127.0.0.1:8000/api/books/"+id)
    .then(function (response) {
      setBooks(response.data.data)
      console.log(response.data.data);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete your book?")) {
      axios
      .delete("http://127.0.0.1:8000/api/books/"+id)
      .then(function (response) {
        setBooks(response.data.data);
      });
    }
  };

  return (
    <div className="container p-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Isbn</th>
            <th scope="col">Authors</th>
            <th scope="col">Country</th>
            <th scope="col">Number of Pages</th>
            <th scope="col">Publisher</th>
            <th scope="col">Release Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((e, i) => (
            <tr key={i}>
              <th scope="row">1</th>
              <td>{e.name}</td>
              <td>{e.isbn}</td>
              <td>
                {e.authors.map((e, i) => (
                  e.name
                ))}
              </td>
              <td>{e.country}</td>
              <td>{e.number_of_pages}</td>
              <td>{e.publisher.name}</td>
              <td>{e.release_date}</td>
              <td>
                <Link className="btn btn-primary me-2" to={`/update/${e.id}`}>edit</Link>
                <button className="btn btn-primary" onClick={() => handleDelete(e.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
