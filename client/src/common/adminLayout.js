import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Navbar from '../components/navbar';


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

const AdminLayout = ({ children, classes, ...rest }) => {
  return (
    <div>
      <Navbar title="moj admin" mainUrl="/admin" />
      <main className={classes.wrapper}>{children}</main>
    </div>
  )
}

export default withStyles(styles)(AdminLayout);