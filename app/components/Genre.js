import api from '../utils/api';
import React from 'react';
import PropTypes from 'prop-types';

export default class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = { genres : null,
                   loading: true,
                   movieGenre: props.movieGenre }
  }

  componentWillMount() {
    api.fetchGenres()
      .then( (genres) => {
        this.setState(function () {
        return { genres: genres, loading: false }
      })
    })    
  }
  
  render () {

    if (this.state.loading) {
      return null;
    }

    var genres = this.state.genres;

    var movieGenre = this.state.movieGenre.map(genre_id => {
      return genres.filter(genre => {
        if(genre_id == genre.id) {
          return genre
        }
      })[0].name
    });
    
    return (
      <p className='movie-genre'>{movieGenre.join(', ')}</p>
    )
  }

}