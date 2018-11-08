import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import HomeContainer from '../containers/home.container';
import CategoryContainer from '../containers/category.container';
import PostDetails from '../containers/postDetails';
import ContactContainer from '../containers/contact.container';

const styles = theme => ({
  wrapper: {
    minHeight: '100%',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
})

const Main = (props) => {
  const { classes } = props;
  return (
    <main className={classes.wrapper}>
      <Switch>
        <Route exact path='/' component={HomeContainer}/>
        <Route exact path='/post/:id' component={PostDetails} />
        <Route exact path='/technology' component={() => <CategoryContainer tag="Technologia" />} />
        <Route exact path='/sience' component={() => <CategoryContainer tag="Nauka" />} />
        <Route exact path='/entertainment' component={() => <CategoryContainer tag="Rozrywka" />} />
        <Route exact path='/contact' component={ContactContainer} />
      </Switch>
    </main>
  )
}

export default withStyles(styles)(Main);
