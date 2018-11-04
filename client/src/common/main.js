import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import Home from '../containers/home';
import PostDetails from '../containers/postDetails';

const styles = {
  wrapper: {
    width: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '75%'
  }
}

const Main = (props) => {
  const { classes } = props;
  return (
    <main className={classes.wrapper}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/post/:id' component={PostDetails} />
      </Switch>
    </main>
  )
}

export default withStyles(styles)(Main);
