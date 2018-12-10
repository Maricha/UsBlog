import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Button, Grid, TextField } from '@material-ui/core';
import { compose, graphql } from 'react-apollo';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

const login = gql`
  mutation($email: String!, $password: String!) {
    login(
      loginInput: {email: $email, password: $password} 
    ) {
      token
    }
  }
`;

const styles = {
  formWrapper: {
    width: '80%',
    marginLeft: '10%',
  }
}

const LoginForm = ({
  values,
  classes,
  isSubmitting,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <Form className={classes.formWrapper}>
      <Grid  
        container
        direction="row"
        spacing={16}
      >
        <Grid item xs={12} md={12}>
          <Field
            required
            id="email"
            name="email" 
            label={touched.email && errors.email ? (errors.email) : "Email" }
            component={TextField}
            value={values.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            type="password"
            required
            id="password"
            name="password" 
            label={touched.password && errors.password ? (errors.password) : "Hasło" }
            component={TextField}
            value={values.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <div>
            <Button type="submit" variant="outlined" className={classes.button}>
              {isSubmitting ? 'Wysyłam...' : 'Zaloguj'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
};


const EnhancedCreatePostForm = compose(
  graphql(login),
  withStyles(styles),
  withFormik({
    mapPropsToValues: (props) => {
      return {
        email: '',
        password: '',
      }
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required(),
      email: Yup.string().required(),
    }),
    handleSubmit: async (values, { props: { mutate, history }, resetForm, setSubmitting }, ...elo) => {
      try {
        const loginResponse = await mutate({
          variables: {
            email: values.email,
            password: values.password,  
          },
        });
        const { data: { login: { token } } } = loginResponse;
        await confirm(token);
        history.push(`/admin`)
      } catch (e) {
        const errors = e.graphQLErrors.map(error => error.message)
        console.log(errors)
        setSubmitting(false)
      }
      resetForm();
    },
    displayName: 'LoginForm',
  })
);

const confirm = async token => {
  localStorage.setItem('auth', token)
}

export default withRouter(EnhancedCreatePostForm(LoginForm));
