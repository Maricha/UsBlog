import React from 'react';
import { Formik, Form, Field, withFormik } from "formik";
import { TextField } from "material-ui-formik-components";
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const createComment = gql`
mutation($postId: Int!, $author: String!, $content: String!) {
  createComment(
      createCommentInput: {authorName: $author, content: $content, postId: $postId}
    ) {
      content
  }
}
`;

const CommentForm = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  errors,
  touched,
  ...props
}) => {
  console.log(props);
  return (
    <Form>
      <Field name="author" label="Nazwa" component={TextField} />
        <div className="form-group">
          <Recaptcha
            sitekey="6LfdyXgUAAAAAAQUVFnadl7riXddk7Oz3rCWd2UG"
            render="explicit"
            theme="dark"
            verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
            onloadCallback={() => { console.log("done loading!"); }}
          />
          {errors.recaptcha
            && touched.recaptcha && (
              <p>{errors.recaptcha}</p>
            )}
        </div>
      <Field name="content" label="Tresc" component={TextField} multiline />
      <button type="submit">Submit</button>
    </Form>
  )
};

export default compose(
  graphql(createComment),
  withFormik({
    mapPropsToValues: () => ({ recaptcha: '', author: '', content: '' }),
    validationSchema: Yup.object().shape({
      recaptcha: Yup.string().required(),
      content: Yup.string().required(),
      author: Yup.string().required()
    }),
    handleSubmit: async (values, { props: { postId, mutate }, setSubmitting, resetForm }) => {
      await mutate({
        variables: { postId: parseInt(postId), content: values.content, author: values.author },
      });
      resetForm(false);
    },
  }),
)(CommentForm);
