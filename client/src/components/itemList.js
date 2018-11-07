import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainItem from './mainItem';
import NormalItem from './normalItem';

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

const ItemList = React.memo((props) => {
  const { 
    classes,
    firstPost,
    secondPost,
    posts
  } = props;
  return (
    <div className={classes.mainStyle}>
      <Grid
          container
          direction="row"
          justify="center"
          align="stretch"
          spacing={24}
      >
      {firstPost && 
        <Grid item xs={12} md={8}>
          <MainItem 
            item={firstPost}
          />
        </Grid>
      }
      { secondPost && 
        <Grid item md xs={12}>
          <MainItem
            item={secondPost}
          />
        </Grid>
      }
      </Grid>
      <Grid container spacing={40} className={classes.cardGrid}>  
        {posts.map(post => (
          <Grid item key={post.id} xs={12} md={3}>
            <NormalItem item={post}/>
          </Grid>
        ))} 
      </Grid>
    </div>
  )
});

export default withStyles(styles)(ItemList);