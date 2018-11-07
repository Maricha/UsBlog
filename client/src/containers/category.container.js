import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import LoadingSpinner from '../components/loadingSpinner';
import ItemList from '../components/itemList';

const POSTS_QUERY = gql`
  query PostsByTag($tag: String!){
    getPostsByTag(tag: $tag) {
      id
      title
      text
      image
      subtitle
      tags {
        name
      }
    }
  }
`;

const CategoryContainer = (props) => {
  const { tag } = props;
  return (
    <Query query={POSTS_QUERY} variables={{ tag }}>
    {({ loading, error, data }) => {
      if (loading) return <LoadingSpinner />
      if (error) return <div>Error</div>
      const posts = data.getPostsByTag;
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

export default CategoryContainer;