import React from 'react';
import { Query } from 'react-apollo'
import 'draft-js/dist/Draft.css';
import gql from 'graphql-tag'

import LoadingSpinner from '../../components/loadingSpinner';
import PostEditForm from '../../forms/postEdit.form';

const POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title,
      text,
      image
    }
  }
`;

class PostEditContainer extends React.Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Query query={POST_QUERY} fetchPolicy="cache-and-network" variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingSpinner />
        if (error) return <div>Error</div>
  
        const post = data.post;
        return (
          <>
            <h2>Edycja postu</h2>
            <PostEditForm post={post} />
          </>
        )
      }}
      </Query>
    );
  }
}

export default PostEditContainer;