import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // const [update, setUpdate] = useState([])
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/movies')
  //     .then(res => setUpdate(res.data))
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        path="/update_movie/:id"
        component={UpdateMovie}
      />
    </>
  );
};

export default App;
