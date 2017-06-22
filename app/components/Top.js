import Movies from './Movies';
import React from 'react';

export default class Top extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: 'vote_average'
    }
  }

  render () {
    return ( 
      <div>
        <h1 className='page-title'>Top Rated</h1>
        <Movies filter={this.state.filter} />
      </div> 
    )
  }
}