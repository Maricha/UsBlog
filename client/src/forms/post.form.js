import React from 'react';
import { Form, Field } from "formik";
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { RichEditorExample } from '../helpers/RichEditor';

import './rich-editor.css';

const styles = {
  formWrapper: {
    width: '80%',
    marginLeft: '10%',
  }
}

const PostForm = ({
  values,
  classes,
  isSubmitting,
  setFieldValue,
  handleBlur,
  handleChange,
}) => {
  console.log(values)
  return (
    <Form className={classes.formWrapper}>
      <Grid  
        container
        direction="row"
        spacing={16}
      >
        <Grid item xs={12} md={12}>
          <RichEditorExample
            editorState={values.editorState}
            onChange={setFieldValue}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            id="image"
            name="image" 
            label="Url obrazka"
            component={TextField}
            value={values.image}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            id="title"
            name="title" 
            label="Tytul"
            component={TextField}
            value={values.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            id="subtitle"
            name="subtitle" 
            label="Podtytul"
            component={TextField}
            value={values.subtitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            id="tags"
            name="tags" 
            label="Tagi"
            component={TextField}
            value={values.tags}
            onChange={handleChange}
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
  )
};
export default withStyles(styles)(PostForm);
