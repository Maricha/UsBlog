import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DeleteButton from './deleteButton';
import { Grid } from '@material-ui/core';

const styles = {
  itemWrapper: {
    padding: '1%',
    lineHeight: '100%',
    paddingLeft: '3%',
    boxShadow: '10px 18px 5px -4px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '10px 18px 5px -4px rgba(0,0,0,0.22)',
    }
  },
  itemLink: {
    color: 'black',
    textDecoration: 'none',
    width: '100%',
    display: 'block',
    height: '100%',
  },
  editWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  editButton: {
    marginTop: '20px',
    textDecoration: 'none',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      color: 'grey',
    }
  }
};

const AdmItem = React.memo((props) => {
  const {classes, post } = props;
  return (
    <Grid container className={classes.itemWrapper}>
      <Grid item md={10} xs={8}>
        <Link to={`admin/post/${post.id}/edit`} className={classes.itemLink}>
          <p>{post.id} {post.title}</p>
        </Link>
      </Grid>
      <Grid item md={1} xs={2}>
        <DeleteButton id={post.id} />
      </Grid>
      <Grid item md={1} xs={2} className={classes.editWrapper}>
        <Link to={`/admin/post/${post.id}/edit`} className={classes.editButton}>Edycja</Link>
      </Grid>
    </Grid>
)
})

export default withStyles(styles)(AdmItem);