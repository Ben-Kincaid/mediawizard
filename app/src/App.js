import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {exampleAction} from './actions/actions.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state={};
    this.props.exampleAction();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
      <p>{this.props.examplePropOne}</p>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    examplePropOne: state.examplePropOne,
    examplePropTwo: state.examplePropTwo
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({exampleAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
