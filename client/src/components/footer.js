import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: '20px',
    paddingTop: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr repeat(1, auto) 1fr',
    justifyItems: 'center',
    //height: '10%',
  },
  social: {
    marginLeft: 'auto',
    paddingRight: '5%',
    display: 'flex',
  },
  content: {
    gridColumnStart: 2,
  },
  socialIcon: {
    border: '1px solid black',
    borderRadius: '100%',
    width: '30px',
    height: '30px',
    position: 'relative',
    marginRight: '5px',
  },
  icon: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
});

const Footer = React.memo((props) => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <Typography variant="h6" align="center" gutterBottom>
          Marcin Starmach
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Blog
        </Typography>
      </div>
      <div className={classes.social}>
        <div className={classes.socialIcon}>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} className={classes.icon} />
        </div>
        <div className={classes.socialIcon}>
          <FontAwesomeIcon icon={['fab', 'twitter']} className={classes.icon} />
        </div>
      </div>
    </footer>
  )
});

Footer.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default withStyles(styles)(Footer);