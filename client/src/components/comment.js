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
    fontWeight: 'bold'
  },
  commentContent: {
    padding: '10px',
    paddingTop: '0',
    flex: '1',
    textAlign: 'left',
    fontWeight: 'normal'
  },
  commentWrapper: {
    boxShadow: '-1px -1px 39px -4px rgba(0,0,0,0.75)',
    backgroundColor: 'white',
    marginLeft: '0',
    borderRadius: '5px',
  }
});

const Comment = React.memo((props) => {
  const { comment, classes } = props;
  return (
    <Grid  
      container
      direction="column"
      className={classes.commentWrapper}
    >
     <Grid item xs={12} md>
       <div className={classes.commentAuthor}>{comment.authorName}</div>
     </Grid>
     <Grid item xs={12} md>
      <div className={classes.commentContent}>{comment.content}</div>
     </Grid>
   </Grid>
  )
});

export default withStyles(styles)(Comment);