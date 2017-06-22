import React from 'react';

// API
import api from '../utils/api';

export default class Profile extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      picture: null,
      loading: true,
    }
  }

  componentDidMount() {
    api.fetchProfilePic(this.props.profileId)
      .then( (picture) => {
        this.setState(() => {
          return { picture: picture, loading: false }
        })
      })
  }

  render () {

    if (this.state.loading) {
      return null;
    }

    return (
      <div className='profile-pic' style={{backgroundImage: 'url(https://image.tmdb.org/t/p/w185/' + this.state.picture + ')'}} ></div>
    )
  }
  
}