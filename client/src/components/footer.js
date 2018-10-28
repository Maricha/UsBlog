import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    height: '10%',
  },
});

const Footer = React.memo((props) => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
    </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Coś
    </Typography>
    </footer>
  )
});

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default withStyles(styles)(Footer);