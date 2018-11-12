import React from 'react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import gql from 'graphql-tag';

import PostForm from './post.form';

const sendEmail = gql`
  mutation($name: String!, $senderEmail: String!, $content: String!, $title: String!) {
    sendEmail(
      sendContactInput: {name: $name, content: $content, title: $title, senderEmail: $senderEmail}
    )
  }
`;

const PostEditForm = props => (
  <PostForm {...props} />
);


const EnhancedEditPostForm = compose(
  graphql(sendEmail),
  withFormik({
    mapPropsToValues: (props) => {
      const { post } = props;
      const blocksFromHTML = convertFromHTML(post.text);
      console.log(props);
      return {
        editorState: new EditorState.createWithContent(blocksFromHTML),
      }
    },
    validationSchema: Yup.object().shape({
      editorState: Yup.object().required(),
    }),
    handleSubmit: async (values, { props: { mutate }, resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      console.log(convertToHTML(values.editorState.getCurrentContent()));
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
    displayName: 'PostEditForm',
  })
);


export default EnhancedEditPostForm(PostEditForm);
