import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router'
import App from './App.js'

import PageNotFound from 'pages/page-not-found'
import Dashboard from 'pages/dashboard'
import ConfigureAccounts from 'pages/configure-accounts'

var Root = React.createClass({
  render: function() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/accounts" component={ConfigureAccounts} />
          <Route path="*" component={PageNotFound} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<Root />, document.getElementById('root'));
