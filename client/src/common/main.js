import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../containers/home';

const Main = () => (
  <main style={{minHeight: 75 + '%'}}>
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  </main>
)

export default Main;
