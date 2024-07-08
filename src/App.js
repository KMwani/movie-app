import './App.css';
import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard";
import SearchIcon from './search.svg';

const App = () => {
     
    const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=ac6322f8';
    const [Movies, setMovies] = useState([]);
    
    const [Sterm,setSterm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch (API_URL + '&s=' + title);
        const data = await response.json();
       // console.log(data.Search);
        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('superman');
    }, []);
return(
   <div className="App">
    <div className='movie-header'>
    <h1>Movie Search</h1>
    </div>
    <div class='search'>
    <div class='search-container'>
        <input
           type='text'
           placeholder='Search for Movies'
           value={Sterm}
           onChange={(e) => setSterm(e.target.value)}
        />
        <img 
            src={SearchIcon}
            alt='search'
            onClick={() => searchMovies(Sterm)}
        />
    </div>
</div>


     
     { 
     Movies?.length >0 ?
     (<div className="movie-container">
         {
         Movies.map((movi) => {
            return(
            <Moviecard movie1={movi}/>)})
            }
      </div>
      ):(
        <div className='empty-center'>
        <div className="empty">
        <h1>No Movies Found</h1>
        </div>
     </div>
      )
     }
      
   </div>
);};




export default App;