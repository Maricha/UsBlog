import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    display: 'flex',  
    flexFlow: 'row wrap',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentAuthor: {
    padding: '10px',
    flex: '1',
    borderRight: '1px solid black',
  },
  commentContent: {
    padding: '10px',
    flex: '4',
    textAlign: 'left',
    fontWeight: 'normal'
  },
  commentWrapper: {
    borderRadius: '50px',
    boxShadow: '-1px -1px 39px -4px rgba(0,0,0,0.75)',
    backgroundColor: 'grey',
    margin: '2%',
  }
});

const Comment = React.memo((props) => {
  const { comment, classes } = props;
  return (
    <Grid  
      container
      direction="row"
      className={classes.commentWrapper}
    >
      <Grid item xs={12} md={3}>
        <div className={classes.commentAuthor}>{comment.authorName}</div>
      </Grid>
      <Grid item xs={12} md>
        <div className={classes.commentContent}>{comment.content}</div>
      </Grid>
    </Grid>
  )
});

export default withStyles(styles)(Comment);