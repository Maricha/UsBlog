import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AdmItem from './admItem';

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
  itemWrapper: {
    padding: '1%',
    lineHeight: '100%',
    paddingLeft: '3%',
    boxShadow: '10px 18px 5px -4px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '10px 18px 5px -4px rgba(0,0,0,0.22)',
    }
  }
});

const AdmItemList = React.memo((props) => {
  const { 
    classes,
    posts
  } = props;
  return (
    <div className={classes.mainStyle}>
      <Grid container spacing={16} className={classes.cardGrid}>  
        {posts.map(post => (
          <Grid item key={post.id} xs={12} md={12}>
            <AdmItem post={post} />
          </Grid>
        ))} 
      </Grid>
    </div>
  )
});

export default withStyles(styles)(AdmItemList);