import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {
    position: 'absolute',
    bottom: 0,
    color: 'inherit',
    fontSize: '30px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '99%',
    wordWrap: 'break-word',
    padding: '1px',
    '& p': {
      padding: '5px',
      marginTop: '5px',
    },
  },
  container: {
    position: 'relative',
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '5px 10px 18px #888888',
      '& div': {
        backgroundColor: 'rgba(0,0,0,0.9)',        
      }
    }
  },
  image: {
    display: 'block',
    width: '100%',
    objectFit: 'contain',
    height: '100%',
  }
}

const NormalItem = React.memo((props) => {
  const { classes, item } = props;
  return (
    <div className={classes.container}>
      <img src="http://www.shinyshiny.tv/asus-android-smartphone-thumb-200x200.jpg" alt="obrazke" className={classes.image} />
      <div className={classes.title}>
        <p>{item.title}</p>
      </div>
    </div>
  )
})

export default withStyles(styles)(NormalItem);