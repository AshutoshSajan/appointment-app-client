import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import ListUsers from './components/ListUsers';
import Home from './components/Home'
import { Layout, Card, Avatar } from 'antd';
const { Meta } = Card;
// const { Header, Footer, Sider, Content } = Layout;

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
