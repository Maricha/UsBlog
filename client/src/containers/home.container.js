import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import LoadingSpinner from '../components/loadingSpinner';
import ItemList from '../components/itemList';

const POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      text
      image
      subtitle
    }
  }
`

const HomeContainer = () => {
  return (
    <Query query={POSTS_QUERY} fetchPolicy="cache-and-network">
    {({ loading, error, data }) => {
      if (loading) return <LoadingSpinner />
      if (error) return <div>Error</div>

      const posts = data.getPosts;
      let firstPost = null;
      let secondPost = null;
      if (posts.length > 0) {
        firstPost = posts[0];
        posts.shift();
        if (posts.length > 0) {
          secondPost = posts[0];
          posts.shift();
        }
      }
      return (
        <ItemList
          firstPost={firstPost}
          secondPost={secondPost}
          posts={posts}
        />
      )
    }}
    </Query>
  )
};

export default HomeContainer;