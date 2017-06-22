import React from 'react';
import ReactDOM from 'react-dom';

// CSS FILE
require('./index.css');
require('./utils/circle.css');

// Component
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
