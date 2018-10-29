import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import MainItem from '../components/mainItem';
import NormalItem from '../components/normalItem';

const styles = theme => ({
  mainStyle: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const POSTS_QUERY = gql`
  {
    getPosts {
      id
      title
      text
    }
  }
`

const Home = React.memo((props) => {
  const { classes } = props;
  return (
    <Query query={POSTS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>
      if (error) return <div>Error</div>

      const posts = data.getPosts;
      const firstPost = posts.length > 0 ? posts[0] : null;
      const secondPost = posts.length > 1 ? posts[1] : null;
    
      console.log('eloeoe', firstPost);
      console.log(posts);
      return (
        <main className={classes.mainStyle}>
          <Grid
              container
              direction="row"
              justify="center"
              align="stretch"
              spacing={24}
          >
          {firstPost && 
           <Grid item md={8}>
            <MainItem 
              item={firstPost}
            />
           </Grid>
          }
          { secondPost && 
            <Grid item md>
              <MainItem
                item={secondPost}
              />
            </Grid>
          }
          </Grid>
          <Grid container spacing={40} className={classes.cardGrid}>  
            {posts.map(post => (
              <Grid item key={post.id} xs={12} md={3}>
                <NormalItem item={post}/>
              </Grid>
            ))} 
          </Grid>
        </main>
      )
    }}
    </Query>
  )
});

export default withStyles(styles)(Home);