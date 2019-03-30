import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  buttonWrapper: {
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    '&:hover': {
      color: 'grey'
    }
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '10px',
  }
}

const POST_MUTATION = gql`
  mutation PostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

class DeleteButton extends PureComponent {
  render() {
    const { id, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Mutation mutation={POST_MUTATION} variables={{ id }}>
          {(postMutation) => (
            <button className={classes.buttonWrapper} onClick={postMutation}>
              X
            </button>
          )}
        </Mutation>
      </div>
    )
  }
}

export default withStyles(styles)(DeleteButton);