import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    height: '100%',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
});

const Navbar = React.memo((props) => {
  const { title, classes } = props;
  return (
    <React.Fragment>
      <div style={{height: 10 + '%'}}>
        <Toolbar className={classes.toolbarMain}>
          <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              >
                {title}
          </Typography>
          <Button size="small">Kontakt</Button>
        </Toolbar>
      </div>
      <div style={{height: 7 + '%'}}>
        <Toolbar variant="dense" className={classes.toolbarSecondary}>
          <Typography color="inherit" noWrap>
            "elo"
          </Typography>
        </Toolbar>
      </div>
    </React.Fragment>
  )
});

Navbar.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.instanceOf(Object)
}

export default withStyles(styles)(Navbar);