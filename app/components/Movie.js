import PropTypes from 'prop-types';
import React from 'react';

// API
import api from '../utils/api';

//Icons
import { MdStar } from 'react-icons/lib/md';

// Components
import Genre from './Genre';
import Loading from './Loading';
import ProfilePic from './ProfilePic';

const FeaturedCrew = (props) => {

  var featuredCrew = [];  
  var featuredJobs = ['Director', 'Writer', 'Story', 'Screenplay'];

  props.movieCrew.forEach((people) => {
    if (featuredJobs.indexOf(people.job) != -1) {
      var uniqueNames = featuredCrew.map(function (val) {
        return val.name;
      });

      if (uniqueNames.indexOf(people.name) == -1)
        featuredCrew.push({name: people.name, job: people.job});
      else {
        featuredCrew[uniqueNames.indexOf(people.name)].job += ', ' + people.job;
      }
    }
  })

  return(
    <div className='featured-crew'>
      <h3>Featured Crew</h3>
      <ul>
        {
          featuredCrew.map((crew, i) => {
            return (
                    <li key={i}>
                      <h5>{crew.name}</h5>
                      <p>{crew.job}</p>
                    </li>
                   )
          })
        }
      </ul>
    </div>
  )
}

FeaturedCrew.propTypes = {
  movieCrew: PropTypes.array.isRequired,
}

const CoverInfo = (props) => {

  var coverImage = {backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/' + props.movieDetails.backdrop_path + ')'};
  var genreId = props.movieDetails.genres.map((genre) => {
    return genre.id;
  })
  
  const intToMoney = (val) => {
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

  return (
    <div className='cover-info-con'>
      <div className='back-drop' style={coverImage}></div>
      <div className='back-tint'></div>
      <div className='movie-cover-con'>
        <div>
          <img className='movie-poster' src={'https://image.tmdb.org/t/p/w342/' + props.movieDetails.poster_path} />
        </div>
        <div>
          <section className='movie-details-con'>
            <h1 className='title'>{props.movieDetails.original_title}</h1>
            <div className='release-genre'>
              <p>{props.movieDetails.status}</p>
              <p>{props.movieDetails.release_date}</p>
              <Genre movieGenre={genreId} />
              <p>{props.movieDetails.runtime} min</p>          
            </div>
            <div className='overview'>
              <h3>Overview</h3> 
              <p>{props.movieDetails.overview}</p>          
            </div>
            <ul className='stats'>
              <li>
                <button onClick={props.handleFavorite} className={(props.favorite) ? 'fav favorite' : 'fav'} title='Click to favorite'><MdStar /></button>
              </li>
              <li>
                <div className='rating-percentage'> 
                  <div className={'c100 p' + props.movieDetails.vote_average * 10 + ' small center green'}>
                    <span>{props.movieDetails.vote_average * 10}<span>%</span></span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <h4>vote count</h4>
                <p>{props.movieDetails.vote_count}</p>
              </li>
              <li>
                <h4>popularity score</h4>
                <p>{parseInt(props.movieDetails.popularity)}</p>
              </li>
              <li>
                <h4>budget</h4>
                <p>${intToMoney(parseInt(props.movieDetails.budget))}</p>
              </li>
              <li>
                <h4>revenue</h4>
                <p>${intToMoney(parseInt(props.movieDetails.revenue))}</p>
              </li>
            </ul>
            <FeaturedCrew movieCrew={props.movieDetails.credits.crew} />
          </section>
        </div>
      </div>
    </div>
  )
}

CoverInfo.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
}

const OtherInfo = (props) => {
  var topCast = [];

  for (var i = 0; i < 6; i++) {
    topCast.push(props.movieDetails.credits.cast[i]);
  }

  return (
    <div className='other-info'>
      <div className='trailer-reviews'>
        <div className='main-trailer-con'>
          <div className='trailer-con'>
            <iframe allowFullScreen className='trailer'
              src={'https://www.youtube.com/embed/' + props.movieDetails.videos.results[0].key}>
            </iframe> 
          </div>
        </div>
        <div className='top-cast'>
          <h3>Top Billed Cast</h3>
          <ul>
            {
              topCast.map((cast) => {
                return (
                  <li key={cast.id} >
                    <ProfilePic profileId={cast.id} />
                    <h3>{cast.name}</h3>
                    <p>{cast.character}</p>  
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='review-con'>
          <h3>Reviews</h3>
          <div className='reviews'>
            {
              props.movieDetails.reviews.results.map((review) => {
                return (
                  <div className='review' key={review.id}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

OtherInfo.propTypes = {
  movieDetails: PropTypes.object.isRequired,
}

export default class Movie extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      details: null,
      favorite: false,
    }

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {    
    api.fetchMovie(this.props.match.params.id)
      .then( (details) => {
        this.setState(() => {
          return { details: details, loading: false }
        }, ()=> {
          if (localStorage.getItem('favMovies') === null) {
            localStorage.setItem('favMovies','initial');
          } else {
            var favMovies = localStorage.getItem('favMovies').split(',');
            if (favMovies.indexOf("" + this.state.details.id) !== -1) {
              this.setState( () => {
                return { favorite: true }
              })
            }
          }
        })
      })
  }
  
  handleFavorite () {
    this.setState( () => {
      return {favorite: !this.state.favorite}
    }, () => { 

      var favMovies = localStorage.getItem('favMovies').split(',');

      if (this.state.favorite) {
        favMovies.push("" + this.state.details.id);
      } else {
        var favMovieIndex = favMovies.indexOf("" + this.state.details.id);
        if (favMovieIndex !== -1) {
          favMovies.splice(favMovieIndex, 1);
        }
      }

      localStorage.setItem('favMovies',favMovies.toString());
    });
  }

  render () {
    var loading = this.state.loading;

    if(loading) {
      return <Loading />
    }

    return (
      <div className='movie-details'>
        <CoverInfo favorite={this.state.favorite} movieDetails={this.state.details} handleFavorite={this.handleFavorite}/>
        <OtherInfo movieDetails={this.state.details} />
      </div>
    )
  }
}

