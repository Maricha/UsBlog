import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainItem from '../components/mainItem';

const styles = theme => ({
  mainStyle: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const Home = React.memo((props) => {
  const { classes } = props;
  return (
    <main className={classes.mainStyle}>
      <Grid
          container
          direction="row"
          justify="center"
          align="stretch"
          spacing={24}
      >
        <Grid item md={8}>
          <MainItem 
            title="Title of a longer featured blog post"
            content="Multiple lines of text that form the lede, informing new readers quickly and \
              efficiently about what&apos;s most interesting in this post&apos;s contents…"
          />
        </Grid>
        <Grid item md>
          <MainItem
            right
            title="Title of a longer featured blog post"
            content="Multiple lines of text that form the lede, informing new readers quickly and"     
          />
        </Grid>
      </Grid>
    </main>
  )
});

export default withStyles(styles)(Home);