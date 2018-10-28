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
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
});

const MainItem = React.memo((props) => {
  const { classes, title, content } = props;

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container>
        <Grid item md={12}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {content}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
});

MainItem.propTypes = {
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  content: PropTypes.string,
}

export default withStyles(styles)(MainItem);