import Movies from './Movies';
import React from 'react';

export default class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: 'popularity'
    }
  }

  render () {
    return ( 
      <div>
        <h1 className='page-title'>Popular Movies</h1>
        <Movies filter={this.state.filter} />         
      </div>    
    )
  }
}