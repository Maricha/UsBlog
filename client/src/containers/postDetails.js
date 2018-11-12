import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import ReactMarkdown from 'react-markdown/with-html';

import LoadingSpinner from '../components/loadingSpinner';
import CommentsList from '../components/commentsList';
import CommentForm from '../forms/comment.form';

const styles = theme => ({
  wrapperHeader: {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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
  },
  commentButtonWrapper: {
    marginTop: '3%',
    marginLeft: '2%',
  },
  formWrapper: {
    marginRight: '3%',
    marginLeft: '3%',
    width: '50%',
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
  state = {
    showCommentButton: false
  }

  handleToogleCommentButton = () => {
    this.setState({
      showCommentButton: !this.state.showCommentButton
    })
  }

  render() {
    const { id } = this.props.match.params
    const { classes } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingSpinner />;
        if (error) return `Error!: ${error}`;
        const { post } = data;
        return (
          <Grid  
            container
            direction="column"
            spacing={16}
          >
            <Grid item xs={12} md={12}>
              <div className={classes.wrapperHeader} style={{backgroundImage: `url(${post.image})`}}>
                <p className={classes.title}>{post.title}</p>
              </div>
            </Grid>
            
            <Grid item xs={12} md={12}>
              <div className={classes.content}>
                <ReactMarkdown source={post.text} escapeHtml={false}/>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div className={classes.commentButtonWrapper}>
                <Button color="primary" variant="contained" onClick={this.handleToogleCommentButton}>
                  Dodaj komentarz
                </Button>
              </div>
            </Grid>
           
            <Grid item xs={12} md={12}>
              {this.state.showCommentButton &&  <div className={classes.formWrapper}><CommentForm postId={id}/></div> }
            </Grid>
            <Grid item xs={12} md={12}>
              <CommentsList id={id} />
            </Grid>
          </Grid>
        );
      }}
    </Query>
    )
  }
}

export default withStyles(styles)(PostDetails);