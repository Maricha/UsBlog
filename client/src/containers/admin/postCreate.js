import React from 'react';
import 'draft-js/dist/Draft.css';

import PostCreateForm from '../../forms/postCreate.form';

class PostCreateContainer extends React.Component {
  render() {
    return (
      <PostCreateForm />
    );
  }
}

export default PostCreateContainer;