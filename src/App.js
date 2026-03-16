import "./App.css";
import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard";
import SearchIcon from "./search.svg";

const App = () => {
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=ac6322f8";
  const [Movies, setMovies] = useState([]);

  const [Sterm, setSterm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(API_URL + "&s=" + title);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search || []);
  };
  useEffect(() => {
    searchMovies("superman");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies(Sterm);
    }
  };
  return (
    <div className="App">
      <div className="top">
        <div className="movie-header">
          <h1>Movie Search</h1>
        </div>
        <div className="search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for movies..."
              aria-label="Search for movies"
              value={Sterm}
              onChange={(e) => setSterm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="search-btn"
              onClick={() => searchMovies(Sterm)}
              aria-label="Search"
            >
              <img src={SearchIcon} alt="Search icon" />
            </button>
          </div>
        </div>
      </div>

      {Movies?.length > 0 ? (
        <div className="movie-container">
          {Movies.map((movi) => {
            return <Moviecard key={movi.imdbID} movie1={movi} />;
          })}
        </div>
      ) : (
        <div className="empty-center">
          <div className="empty">
            <h1>No Movies Found</h1>
          </div>
        </div>
      )}
      <div className="ft">
        <footer>@Copyright 2025</footer>
      </div>
    </div>
  );
};

export default App;
