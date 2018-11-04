import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';

import LoadingSpinner from '../components/loadingSpinner';
import Comment from '../components/comment';

const styles = theme => ({
  wrapper: {
    boxShadow: '5px 5px 5px #888888',
    padding: '20px'
  },
  header: {
    borderBottom: '1px solid black'
  }
});

const COMMENTS_QUERY = gql`
  query Comments($id: ID!) {
    getCommentsForPost(id: $id) {
      id
      content
      authorName
    }
  }
`;

class CommentsList extends React.Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Query query={COMMENTS_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return `Error!: ${error}`;
          const { getCommentsForPost } = data;
          return (
            <div className={classes.wrapper}>
              <div className={classes.header}>
                <h2>Komentarze</h2>
              </div>
              {getCommentsForPost.map(comment => (
               <Comment comment={comment} key={comment.id} />
              ))}
            </div>
          );
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CommentsList);