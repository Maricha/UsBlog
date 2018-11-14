import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import gql from 'graphql-tag';

import PostForm from './post.form';

const editPost = gql`
  mutation($title: String!, $subtitle: String!, $content: String!, $image: String!, $tags: [Int], $id: Int!) {
    updatePost(
      updatePostInput: {title: $title, subtitle: $subtitle, text: $content, image: $image, tagsId: $tags, id: $id} 
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

const PostEditForm = props => (
  <PostForm {...props} />
);

const EnhancedEditPostForm = compose(
  graphql(editPost),
  graphql(getTags),
  withFormik({
    mapPropsToValues: (props) => {
      const { post } = props;
      const blocksFromHTML = convertFromHTML(post.text);
      return {
        editorState: new EditorState.createWithContent(blocksFromHTML),
        tags: post.tags,
        title: post.title,
        subtitle: post.subtitle,
        image: post.image,
        id: post.id,
      }
    },
    validationSchema: Yup.object().shape({
      editorState: Yup.object().required(),
    }),
    handleSubmit: async (values, { props: { mutate }, resetForm }) => {
      console.log('elo', values);
      const content = convertToHTML(values.editorState.getCurrentContent());
      const tagsId = await values.tags.map(tag => Number(tag.id));
      await mutate({
        variables: { 
          content,
          title: values.title,
          subtitle: values.subtitle,  
          tags: tagsId,
          image: values.image,
          id: values.id,
        },
      });
      resetForm();
    },
    displayName: 'PostEditForm',
  })
);


export default EnhancedEditPostForm(PostEditForm);
