import React from "react";
import axios from "axios";

class AddMovie extends React.Component {
    constructor(props){
    super(props)
  this.state = {
    addMovie: {
      id: "",
      title: "",
      director: "",
      metascore: "",
      stars: []
    },
    movieList: []
  };
  console.log(props,"testing props")
}

  handleChange = e => {
    this.setState({
      addMovie: {
        ...this.state.addMovie,
        [e.target.name]: e.target.value
      }
    });
  };

  handleStringChanges = e => {
    this.setState({
        addMovie: {
          ...this.state.addMovie,
          [e.target.name]: e.target.value.split()
        }
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  createMovie = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", this.state.addMovie)
      .then(res => {
        // localStorage.setItem("token", res.data.payload);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
      
    return (
      <div>
        <form onSubmit={this.createMovie}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.addMovie.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="director"
            placeholder="director"
            value={this.state.addMovie.director}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="metascore"
            placeholder="metascore"
            value={this.state.addMovie.metascore}
            onChange={this.handleChange}
          />
          <input
            type={[]}
            name="stars"
            placeholder="stars"
            value={this.state.addMovie.stars}
            onChange={this.handleStringChanges}
          />
          <button type="submit">Add Movie</button>
        </form>
        {this.state.movieList.map(movie => {
          return (
            <div key={movie.id}>
              <p>{movie.title}</p>
              <p>{movie.director}</p>
              <p>{movie.metascore}</p>
              <p>{movie.stars}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AddMovie;
