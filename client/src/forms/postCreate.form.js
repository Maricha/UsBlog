import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';

import PostForm from './post.form';

const createPost = gql`
  mutation($title: String!, $subtitle: String!, $content: String!, $image: String!, $tags: [Int]) {
    createPost(
      createPostInput: {title: $title, subtitle: $subtitle, text: $content, image: $image, tagsId: $tags} 
    ) {
      title,
      subtitle
    }
  }
`;

const getTags = gql`
  query {
    getTags {
      value,
      id,
      label
    }
  }
`;

const PostCreateForm = props => (
  <PostForm {...props} />
);


const EnhancedCreatePostForm = compose(
  graphql(createPost, { options: { fetchPolicy: 'cache-first' } }),
  graphql(getTags),
  withFormik({
    mapPropsToValues: (props) => {
      return {
        editorState: new EditorState.createEmpty(),
        title: '',
        subtitle: '',
        image: '',
        tags: [],
      }
    },
    validationSchema: Yup.object().shape({
      editorState: Yup.object().required(),
      image: Yup.string().required(),
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      tags: Yup.array().required(),
    }),
    handleSubmit: async (values, { props: { data, mutate, history }, resetForm }) => {
      const content = await convertToHTML(values.editorState.getCurrentContent());
      const tagsId = await values.tags.map(tag => Number(tag.id));
      await mutate({
        variables: {
          content,
          title: values.title,
          subtitle: values.subtitle,  
          tags: tagsId,
          image: values.image,
        },
      });
      history.push(`/admin`)
      toast.success("Dodano post pomyślnie");
      //resetForm();
    },
    displayName: 'PostCreateForm',
  })
);


export default EnhancedCreatePostForm(PostCreateForm);
