import React from 'react';
import { Form, Field, withFormik } from "formik";
import { TextField } from "material-ui-formik-components";
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = {
  captcha: {
    margin: '3%',
    marginLeft: 'unset'
  }
}

const createComment = gql`
mutation($postId: Int!, $author: String!, $content: String!) {
  createComment(
      createCommentInput: {authorName: $author, content: $content, postId: $postId}
    ) {
      content
  }
}
`;

let recaptchaInstance;
const resetRecaptcha = () => {
  recaptchaInstance.reset();
};

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
  classes,
  ...props
}) => {
  return (
    <Form>
      <Field 
        name="author"
        label="Nazwa"
        value={values.author}
        component={TextField} />
      <Field 
        name="content" 
        label="Tresc"
        component={TextField}
        value={values.content}
        multiline />
      <div className={classes.captcha}>
        <Recaptcha
          sitekey="6LfdyXgUAAAAAAQUVFnadl7riXddk7Oz3rCWd2UG"
          render="explicit"
          theme="dark"
          verifyCallback={(response) => { setFieldValue("recaptcha", response); }}
          onloadCallback={() => {}}
          ref={e => recaptchaInstance = e}
        />
        {errors.recaptcha
          && touched.recaptcha && (
            <p>{errors.recaptcha}</p>
          )}
      </div>
      <div>
        <Button type="submit" variant="outlined" className={classes.button}>
          Zatwierdż
        </Button>
      </div>
    </Form>
  )
};

export default compose(
  withStyles(styles),
  graphql(createComment),
  withFormik({
    mapPropsToValues: () => ({ recaptcha: '', author: '', content: '' }),
    validationSchema: Yup.object().shape({
      recaptcha: Yup.string().required(),
      content: Yup.string().required(),
      author: Yup.string().required()
    }),
    handleSubmit: async (values, { props: { postId, mutate }, setFieldValue, resetForm }) => {
      await mutate({
        variables: { postId: parseInt(postId), content: values.content, author: values.author },
      });
      resetRecaptcha();
      resetForm();
      toast.info("Dodano komentarz");
    },
  }),
)(CommentForm);
