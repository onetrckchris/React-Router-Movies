import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      savedList: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({ savedList });
  };

  render() {
    return (
      <Router>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props => <MovieList movies={this.state.movies} />} />
        <Route exact path="/movies/:movieId" component={Movie} />
      </Router>
    );
  }
}
