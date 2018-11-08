import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import LoadingSpinner from '../components/loadingSpinner';
import Comment from '../components/comment';

const styles = ({
  wrapper: {
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

const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription {
    commentAdded {
      id
      content
      authorName
    }
  }
`;

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data: { getCommentsForPost } } = this.props;
    let content;
    if (getCommentsForPost.length > 0) {
      content = <>
                  {getCommentsForPost.map(comment => (
                    <Grid item key={comment.id}>
                      <Comment comment={comment} key={comment.id} />
                    </Grid>
                  ))}
                </>
   
    } else {
      content = <p>Brak komentarzy. Bądź pierwszy!</p>
    }

    return (
      content
    );
  }
};


class CommentsList extends React.Component {
  render() {
    const { classes, id } = this.props;
    return (
      <Query query={COMMENTS_QUERY} variables={{ id }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return `Error!: ${error}`;
          const { getCommentsForPost } = data;
          const more = () => subscribeToMore({
            document: NEW_COMMENTS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const { commentAdded } = subscriptionData.data;
              return Object.assign({}, prev, {
                getCommentsForPost: [commentAdded, ...prev.getCommentsForPost],
              });
            },
          });
          return (
            <div className={classes.wrapper}>
              <div className={classes.header}>
                <h2>Komentarze</h2>
              </div>
              <Grid container direction="column" spacing={24}>
                <MessageListView data={data} subscribeToMore={more} />
              </Grid>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CommentsList);