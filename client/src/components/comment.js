import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';

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
    textAlign: 'left'
  }
});

const Comment = React.memo((props) => {
  const { comment, classes } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.commentAuthor}>{comment.authorName}</div>
      <div className={classes.commentContent}>{comment.content}</div>
    </div>
  )
});

export default withStyles(styles)(Comment);