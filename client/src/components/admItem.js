import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
  }
};

const AdmItem = React.memo((props) => {
  const {classes, post } = props;
  return (
    <Link to={`admin/${post.id}/edit`} className={classes.itemLink}>
      <div className={classes.itemWrapper}>
          <p>{post.id} {post.title}</p>
      </div>
    </Link>
  )
})

export default withStyles(styles)(AdmItem);