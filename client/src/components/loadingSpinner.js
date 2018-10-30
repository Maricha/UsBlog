import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';


const styles = {
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const LoadingSpinner = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <ClipLoader
        sizeUnit={"px"}
        size={300}
        color={'#123abc'}
      />
    </div>
  )
};

LoadingSpinner.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

export default withStyles(styles)(LoadingSpinner);