import { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [country, setCountry] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [publisher, setPublisher] = useState("");

  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .put("http://127.0.0.1:8000/api/books/"+id, {
      name: name,
      isbn: isbn,
      country: country,
      numberOfPages: numberOfPages,
      releaseDate: releaseDate,
      publisher: publisher
    })
    .then(function (response) {
      console.log(response);
    });
  }

  return (
    <div className="container p-4">
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form onSubmit={handleSubmit}>
            <div className='form-input'>
              <label>Enter your name:</label>
              <input
                type="text" 
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-input mt-2'>
              <label>ISBN:</label>
              <input 
                type="text" 
                name="age" 
                className="form-control"
                value={isbn} 
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>
            <div className='form-input mt-2'>
              <label>Country:</label>
              <input 
                type="text" 
                name="age" 
                className="form-control"
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className='form-input mt-2'>
              <label>Number of Pages:</label>
              <input 
                type="text" 
                name="age" 
                className="form-control"
                value={numberOfPages} 
                onChange={(e) => setNumberOfPages(e.target.value)}
              />
            </div>
            <div className='form-input mt-2'>
              <label>Release Date:</label>
              <input 
                type="text" 
                name="age" 
                className="form-control"
                value={releaseDate} 
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
            <div className='form-input mt-2'>
              <label>Publisher:</label>
              <input 
                type="text" 
                name="age" 
                className="form-control"
                value={publisher} 
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
            <button className="btn btn-primary mt-3" type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
