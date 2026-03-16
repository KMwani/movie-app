import "./App.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Moviecard from "./Moviecard";
import SearchIcon from "./search.svg";

const App = () => {
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "";
  const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;
  const DEFAULT_QUERY = "superman";
  const [Movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [Sterm, setSterm] = useState("");
  const activeRequestRef = useRef(null);
  const requestIdRef = useRef(0);

  const searchMovies = useCallback(
    async (title) => {
      const query = title?.trim() || DEFAULT_QUERY;
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      setIsLoading(true);
      setMovies([]);

      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
      }

      const controller = new AbortController();
      activeRequestRef.current = controller;

      try {
        const response = await fetch(
          API_URL + "&s=" + encodeURIComponent(query),
          {
            signal: controller.signal,
          },
        );
        const data = await response.json();
        if (requestId === requestIdRef.current) {
          setMovies(Array.isArray(data.Search) ? data.Search : []);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          if (requestId === requestIdRef.current) {
            setMovies([]);
          }
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [API_URL, DEFAULT_QUERY],
  );

  useEffect(() => {
    searchMovies(DEFAULT_QUERY);

    return () => {
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
      }
    };
  }, [searchMovies, DEFAULT_QUERY]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSterm(value);

    if (value.trim() === "") {
      searchMovies(DEFAULT_QUERY);
    }
  };

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
              onChange={handleSearchChange}
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

      {isLoading ? (
        <div className="empty-center">
          <div className="empty">
            <h1>Searching...</h1>
          </div>
        </div>
      ) : Movies?.length > 0 ? (
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
