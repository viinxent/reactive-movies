import PropTypes from 'prop-types';
import React from 'react';


// Component
import MovieThumb from './MovieThumb'

const MovieGrid = (props) => {
  return (
    <div className="movie-grid">
      {props.movies.map((movie) => {
        return (
          <MovieThumb movie={movie} key={movie.id}/>
        )
      })}
    </div>
  )
}

MovieGrid.PropTypes = {
  movies: PropTypes.array.isRequired,
}

module.exports = MovieGrid;