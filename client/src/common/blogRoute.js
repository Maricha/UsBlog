import React from 'react';
import { Route } from 'react-router-dom'

import BlogLayout from './blogLayout';

const BlogRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <BlogLayout>
        <Component {...matchProps} />
      </BlogLayout>
    )} />
  )
};

export default BlogRoute;
