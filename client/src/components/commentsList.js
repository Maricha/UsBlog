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
    const { data } = this.props;
    return (
      <React.Fragment>
        {data.getCommentsForPost.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </React.Fragment>
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
              <MessageListView data={data} subscribeToMore={more} />
            </div>
          );
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CommentsList);