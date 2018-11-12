import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import gql from 'graphql-tag';

import PostForm from './post.form';

const createPost = gql`
  mutation($name: String!, $senderEmail: String!, $content: String!, $title: String!) {
    createPost(
      createPostInput: {title: $name, text: $content, subtitle: $title, image: $senderEmail, tags: $tags}
    )
  }
`;

const PostCreateForm = props => (
  <PostForm {...props} />
);


const EnhancedCreatePostForm = compose(
  graphql(createPost),
  withFormik({
    mapPropsToValues: () => {
      return {
        editorState: new EditorState.createEmpty(),
        title: '',
        subtitle: '',
        tags: '',
        image: '',
      }
    },
    validationSchema: Yup.object().shape({
      editorState: Yup.object().required(),
      image: Yup.string().required(),
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      tags: Yup.string().required(),
    }),
    handleSubmit: async (values, { props: { mutate }, resetForm }) => {
      console.log(convertToHTML(values.editorState.getCurrentContent()));
      console.log('www', values)
      // await mutate({
      //   variables: { 
      //     content: values.content,
      //     name: values.name,
      //     title: values.title,  
      //     senderEmail: values.email,
      //   },
      // });
      resetForm();
    },
    displayName: 'PostCreateForm',
  })
);


export default EnhancedCreatePostForm(PostCreateForm);
