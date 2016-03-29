import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import App from './App.js'
import PageNotFound from 'components/page-not-found'
import Dashboard from 'components/dashboard'

var Root = React.createClass({
  render: function() {
    return (
      <Router >
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard} />
        </Route>
        <Route path="*" component={PageNotFound} />
      </Router>
    )
  }
})

ReactDOM.render(<Root />, document.getElementById('root'));
