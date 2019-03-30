import React from 'react';
import renderer from 'react-test-renderer';
import AdmItem from '../admItem';
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';

describe('AdmItem Component', () => {
  it('renders correctly', () => {
    const post = {
      id: 1,
      title: "title"
    }

    const client = new ApolloClient({
      link: createHttpLink({ uri: 'http://localhost:3000' }),
      cache: new InMemoryCache()
    })

    const tree = renderer.create(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AdmItem post={post} />
        </ApolloProvider>
      </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});