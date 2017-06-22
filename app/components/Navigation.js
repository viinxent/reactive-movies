import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul className='nav'>
        <li><Link to='/' className='brand'>REFLIX</Link></li>     
        <li><NavLink exact to='/' activeClassName='active' className='nav-link'>Popular</NavLink></li>
        <li><NavLink to='/top-rated' activeClassName='active' className='nav-link'>Top rated</NavLink></li>                  
      </ul>
    </nav>
  )
}

module.exports = Navigation;