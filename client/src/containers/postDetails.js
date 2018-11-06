import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';

import LoadingSpinner from '../components/loadingSpinner';
import CommentsList from '../components/commentsList';
import CommentForm from '../forms/comment.form';

const styles = theme => ({
  wrapperHeader: {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: '3%',
    color: 'white',
    fontSize: '50px',
    width: '100%',
    textAlign: 'center'
  },
  content: {
    boxShadow: '5px 5px 5px #888888',
    borderRadius: '5px',
    marginTop: '2%',
    padding: '20px'
  }
});

const POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title,
      text,
      image
    }
  }
`;

class PostDetails extends React.Component {
  render() {
    const { id } = this.props.match.params
    const { classes } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <LoadingSpinner />;
        if (error) return `Error!: ${error}`;
        const { post } = data;
        return (
          <div>
            <div className={classes.wrapperHeader} style={{backgroundImage: `url(${post.image})`}}>
              <p className={classes.title}>{post.title}</p>
            </div>
            <div className={classes.content}>
              {post.text}
            </div>
            <CommentsList id={id} />
            <CommentForm postId={id}/>
          </div>
        );
      }}
    </Query>
    )
  }
}

export default withStyles(styles)(PostDetails);