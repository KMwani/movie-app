import './App.css';
import React  from "react";


const Moviecard = ({movie1}) => {
    return(
      <div className="moviecard">
          <div className='year'>
              <p>{movie1.Year}</p>
          </div>
          <div className='image-container'>
              <img
                 src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'}
                 alt="movie"
              />
          </div>
          <div className='details'>
              <h3>{movie1.Title}</h3>
              <span>{movie1.Type}</span>
          </div>
      </div>
    );
  
  };


  export default Moviecard