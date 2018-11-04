import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ClipLoader } from 'react-spinners';
import ProgressiveImage from 'react-progressive-image';
import { Link } from 'react-router-dom'


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
    height: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: '200px'
  }
}

const placeholder = (
  <ClipLoader
    sizeUnit={"px"}
    size={150}
    color={'#123abc'}
  />
);

const NormalItem = React.memo((props) => {
  const { classes, item } = props;
  return (
    <ProgressiveImage src={item.image} placeholder="">
      {(src, loading) => {
        return loading ? placeholder : (
          <Link to={`post/${item.id}`}>
            <div className={classes.container}>
              <div className={classes.imageWrapper}>
                <img src={src} className={classes.image} />
              </div>
              <div className={classes.title}>
                <p>{item.title}</p>
              </div>
            </div>
          </Link>
        )
      }}
    </ProgressiveImage>
  )
})

export default withStyles(styles)(NormalItem);