import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";

import ListUsers from './components/ListUsers';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ListUsers} />
        <Route path="/users/:id" component={UserProfile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
