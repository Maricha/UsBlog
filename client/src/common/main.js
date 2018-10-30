import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../containers/home';
import PostDetails from '../containers/postDetails';

const Main = () => (
  <main style={{minHeight: 75 + '%'}}>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/post/:id' component={PostDetails} />
    </Switch>
  </main>
)

export default Main;
