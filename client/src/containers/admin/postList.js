import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import LoadingSpinner from '../../components/loadingSpinner';
import AdmItemList from '../../components/admItemList';

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

const AdmPostsListContainer = () => {
  return (
    <Query query={POSTS_QUERY} fetchPolicy="cache-and-network">
    {({ loading, error, data }) => {
      if (loading) return <LoadingSpinner />
      if (error) return <div>Error</div>

      const posts = data.getPosts;
      return (
        <AdmItemList
          posts={posts}
        />
      )
    }}
    </Query>
  )
};

export default AdmPostsListContainer;