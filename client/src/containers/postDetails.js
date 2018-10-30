import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import LoadingSpinner from '../components/loadingSpinner';

const POST_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title,
      text
    }
  }
`;

class PostDetails extends React.Component {
  render() {
    const { id } = this.props.match.params
    return (
      <Query query={POST_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <LoadingSpinner />;
        if (error) return `Error!: ${error}`;
  
        return (
          <p>{data.post.title}</p>
        );
      }}
    </Query>
    )
  }
}

export default PostDetails;