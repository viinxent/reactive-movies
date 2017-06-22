import PropTypes from 'prop-types';
import React from 'react';

// API Call
import api from '../utils/api';

//Component
import Loading from './Loading';
import MovieGrid from './MovieGrid';

//Icons
import { MdChevronLeft, MdChevronRight } from 'react-icons/lib/md';

const Pagination = (props) => {
  return(
    <div className='pagination'>
      <p>{props.curPage} of {props.totalPages} - {props.totalResults} results</p>
      <div className='arrows-con'>
        {(props.curPage > 1) ? <button onClick={props.handlePage.bind(null,'prev')}><MdChevronLeft /></button> : null}
        <button onClick={props.handlePage.bind(null,'next')}><MdChevronRight /></button>                   
      </div>
    </div>
  )
}

Pagination.PropTypes = {
  handlePage: PropTypes.func.isRequired,
  curPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
}

const MovieSort = (props) => {
  var sort = props.sort;
  sort = (sort === 'desc') ? 'asc' : 'desc';
  return ( 
    <div className='sort-options'>
      <button className='sort-movies' onClick={props.handleSort.bind(null,sort)}>
        {(sort === 'desc') ? 'ascending' : 'descending'}
      </button>
    </div> 
  )
}

MovieSort.propTypes = {
  handleSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}

export default class Movies extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      curPage: 1,         
      filter: props.filter,        
      movies: null,
      sort: 'desc',
      totalPages: 1,
      totalResults: 1,
      loading: true,         
    }

    this.changePage = this.changePage.bind(this);    
    this.handlePage = this.handlePage.bind(this);
    this.updateMovies = this.updateMovies.bind(this);
    this.handleSort = this.handleSort.bind(this);    
  }

  componentDidMount() {

      this.updateMovies(this.state.filter, this.state.sort, this.state.curPage);

  }

  updateMovies (filter, sort, page) {
    api.fetchMovies(filter, sort, page)
      .then( (movies) => {
        this.setState( () => {
            return { movies: movies.results, 
                     totalPage: movies.total_pages,
                     totalResults: movies.total_results,
                     loading: false, }
        })
      })
  }

  changePage (page) {
    this.setState( () => {
        return {
          curPage: page
        }
      }, () => {
        this.updateMovies(this.state.filter, this.state.sort, this.state.curPage);
      })
  }

  handlePage (status) {

    var page;

    switch (status) {
      case 'prev':
        page = this.state.curPage - 1;
        this.changePage(page);
        break;
      case 'next':
        page = this.state.curPage + 1;
        this.changePage(page);
        break;
      default:
        console.log('Unknown page');
        break;
    }
  }

  handleSort (sort) {
    this.setState(() => {
      return { sort: sort }
    }, () => {
      this.updateMovies(this.state.filter, this.state.sort, this.state.curPage);
    })
  }

  render () {

    if(this.state.loading) {
      return <Loading />
    }

    return (
      <div>
        <MovieSort handleSort={this.handleSort} sort={this.state.sort} />
        <MovieGrid movies={this.state.movies} />
        <Pagination handlePage={this.handlePage} curPage={this.state.curPage} totalPages={this.state.totalPage} totalResults={this.state.totalResults} />
      </div>
    )    
  }
}

Movies.propsTypes = {
  filter: PropTypes.string.isRequired,
}