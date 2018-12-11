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
`;

const DELETE_POST_SUBSCRIPTION = gql`
  subscription {
    postDeleted {
      id
      title
      subtitle
    }
  }
`;

const AdmPostsListContainer = () => {
  return (
    <Query query={POSTS_QUERY} fetchPolicy="cache-and-network">
    {({ loading, error, data, subscribeToMore, ...rest }) => {
      if (loading) return <LoadingSpinner />
      if (error) return <div>Error</div>
      console.log('reszzta', rest);
      const more = () => subscribeToMore({
        document: DELETE_POST_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          const { postDeleted } = subscriptionData.data;
          const withoutDeleted = prev.getPosts.filter((item) => item.title !== postDeleted.title);
          return Object.assign({}, prev, {
            getPosts: withoutDeleted,
          });
        },
      });
      return (
        <AdmItemList
          posts={data.getPosts} subscribeToMore={more}
        />
      )
    }}
    </Query>
  )
};

export default AdmPostsListContainer;