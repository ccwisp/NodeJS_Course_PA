import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import LoginForm from './loginForm';

class App extends Component {
  state = {};

  render() {
    return (
      <Switch>
        <Route path={'/user/register'} component={RegisterForm} />
        <Route path={'/'} component={LoginForm} />
      </Switch>
    );
  }
}

export default App;
