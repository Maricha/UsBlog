import React from 'react';
import 'draft-js/dist/Draft.css';

import PostCreateForm from '../../forms/postCreate.form';

class PostCreateContainer extends React.Component {
  render() {
    return (
      <>
        <h2 style={{ marginLeft: '10%' }}>Dodawanie postu</h2>
        <PostCreateForm />
      </>
    );
  }
}

export default PostCreateContainer;