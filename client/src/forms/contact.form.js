import React from 'react';
import { Form, Field, withFormik } from "formik";
import { TextField } from "material-ui-formik-components";
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { compose, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const styles = {
  formWrapper: {
    width: '80%',
    marginLeft: '10%',
  }
}

const sendEmail = gql`
  mutation($name: String!, $senderEmail: String!, $content: String!, $title: String!) {
    sendEmail(
      sendContactInput: {name: $name, content: $content, title: $title, senderEmail: $senderEmail}
    )
  }
`;

const ContactForm = ({
  values,
  errors,
  touched,
  classes,
  isSubmitting
}) => {
  return (
    <>
      <h2>Formularz kontaktowy</h2>
      <Form className={classes.formWrapper}>
        <Grid  
          container
          direction="row"
          spacing={16}
        >
          <Grid item xs={12} md={12}>
            <Field 
              name="name"
              label="Imie i nazwisko"
              value={values.name}
              component={TextField} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Field 
              name="title"
              label="Tytuł"
              value={values.title}
              component={TextField} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Field
              type="email"
              name="email" 
              label="Email"
              component={TextField}
              value={values.email}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Field 
              name="content" 
              label="Tresc"
              component={TextField}
              value={values.content}
              multiline
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div>
              <Button type="submit" variant="outlined" className={classes.button}>
                {isSubmitting ? 'Wysyłam...' : 'Zatwierdz'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  )
};

export default compose(
  withStyles(styles),
  graphql(sendEmail),
  withFormik({
    mapPropsToValues: () => ({ name: '', email: '', content: '', title: '' }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      content: Yup.string().required(),
      email: Yup.string().required(),
      title: Yup.string().required(),
    }),
    handleSubmit: async (values, { props: { mutate }, resetForm }) => {
      await mutate({
        variables: { 
          content: values.content,
          name: values.name,
          title: values.title,  
          senderEmail: values.email,
        },
      });
      resetForm();
      toast.info("Wysłano wiadomość");
    },
  }),
)(ContactForm);
