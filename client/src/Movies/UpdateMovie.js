import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [update, setUpdate] = useState(initialItem);
  //   const [item, setItem] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setUpdate(res.data))

      .catch(error => console.log(error));
  }, [props.match.params.id]);

  const changeHandler = e => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
        // res.data ==> full array with updated item
        // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
        // const newItemsArr = props.items.map
        // props.updateItems(res.data);
        props.history.push(`/movies/${update.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={update.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={update.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={update.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={update.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
