import React from 'react';
import { Form, Field } from "formik";
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { RichEditorExample } from '../helpers/RichEditor';
import Select from 'react-select';

import './rich-editor.css';

const styles = {
  formWrapper: {
    width: '80%',
    marginLeft: '10%',
  }
}

class MySelect extends React.PureComponent {
  handleChange = value => {
    this.props.onChange('tags', value);
  };

  handleBlur = () => {
    this.props.onBlur('tags', true);
  };

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="tags">Tagi</label>
        <Select
          id="tags"
          options={this.props.options}
          isMulti
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
          )}
      </div>
    );
  }
}

const PostForm = ({
  values,
  classes,
  isSubmitting,
  setFieldValue,
  setFieldTouched,
  handleBlur,
  handleChange,
  errors,
  touched,
  data
}) => {
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
            label={touched.editorState && errors.editorState ? (errors.editorState) : "Tresc" }
            required
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            required
            id="image"
            name="image" 
            label={touched.image && errors.image ? (errors.image) : "Url obrazka" }
            component={TextField}
            value={values.image}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            required
            id="title"
            name="title" 
            label={touched.title && errors.title ? (errors.title) : "Tytul" }
            component={TextField}
            value={values.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Field
            required
            id="subtitle"
            name="subtitle" 
            label={touched.subtitle && errors.subtitle ? (errors.subtitle) : "Podtytul" }
            component={TextField}
            value={values.subtitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MySelect
            value={values.tags}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.test}
            touched={touched.test}
            options={data.getTags}
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
