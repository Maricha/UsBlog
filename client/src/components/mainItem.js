import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    minHeight: '400px',
    maxHeight: '400px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  mainFeaturedPostContent: {
    // padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: '10%',
    position: 'absolute',
    width: '100%',
  },
});

const MainItem = React.memo((props) => {
  const { classes, item } = props;
  const img = 'http://www.shinyshiny.tv/asus-android-smartphone-thumb-200x200.jpg';

  return (
    <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${img})`}}>
      <Grid container
      >
        <Grid item md={12}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h4" color="inherit" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {item.text}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
});

MainItem.propTypes = {
  classes: PropTypes.instanceOf(Object),
  item: PropTypes.instanceOf(Object),
}

export default withStyles(styles)(MainItem);