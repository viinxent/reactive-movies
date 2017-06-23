import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

// Component
import Genre from './Genre';

const MovieThumb = (props) => {
  return (
      <Link to={'/movie/' + props.movie.id} className="movie-con">
        <div className='movie-info'>
          <div className='rating-date'>
            <p className='rating'>
              {parseFloat(props.movie.vote_average).toFixed(1)}
            </p>
            <div className='release-year'>
              <p>RELEASED</p>
              <p>{props.movie.release_date}</p>  
            </div>                
          </div>
          <p className='movie-title'>{props.movie.title}</p>
          <Genre movieGenre={props.movie.genre_ids} />            
        </div>
        <img className='movie-poster' src={'https://image.tmdb.org/t/p/w300' + props.movie.backdrop_path }/>                          
      </Link> 
  )
}

MovieThumb.propTypes = {
  movie: PropTypes.object.isRequired,
}



module.exports = MovieThumb;