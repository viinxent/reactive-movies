import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Movie from './Movie';
import NotFound from './404';
import Navigation from './Navigation';
import Popular from './Popular';
import Top from './Top';

export default class App extends React.Component {
  render () {
    return (
      <Router>
          <div>
              <Navigation />
              <Switch>
                <Route exact path='/' component={Popular} />                  
                <Route path='/top-rated'  component={Top} />
                <Route path='/movie/:id' component={Movie} />
                <Route component={NotFound} />
              </Switch>
          </div>
      </Router>
    )
  }
}