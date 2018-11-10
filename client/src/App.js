import React, { Component } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router } from 'react-router-dom'

import PostCreateContainer from './containers/postCreate';
import HomeContainer from './containers/home.container';
import CategoryContainer from './containers/category.container';
import PostDetails from './containers/postDetails';
import ContactContainer from './containers/contact.container';

import BlogRoute from './common/blogRoute';
import AdminRoute from './common/adminRoute';

class App extends Component {
  render() {
    return (
    <Router>
      <Switch>
        <BlogRoute exact path="/" component={HomeContainer} />
        <BlogRoute exact path="/post/:id" component={PostDetails} />
        <BlogRoute exact path='/technology' component={() => <CategoryContainer tag="Technologia" />} />
        <BlogRoute exact path='/sience' component={() => <CategoryContainer tag="Nauka" />} />
        <BlogRoute exact path='/entertainment' component={() => <CategoryContainer tag="Rozrywka" />} />
        <BlogRoute exact path='/contact' component={ContactContainer} />
        <AdminRoute exact path='/admin/post/create' component={PostCreateContainer} />
      </Switch>
    </Router>
    );
  }
}

export default App;
