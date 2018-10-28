import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar';
import Main from './common/main';
import Footer from './components/footer';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar title="moj blog" />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
