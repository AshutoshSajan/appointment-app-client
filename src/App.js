import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";

import { Layout } from 'antd';
// const { Header, Footer, Sider, Content } = Layout;
import Home from './components/Home'
import ListUsers from './components/ListUsers';
import UserProfile from './components/UserProfile';





function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Layout>
        <Switch>
          <Route exact path="/" component={ListUsers} />
          <Route path="/users/:id" component={UserProfile} />
        </Switch>
      </Layout>

    </div>
  );
}

export default withRouter(App);
