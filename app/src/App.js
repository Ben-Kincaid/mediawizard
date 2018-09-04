import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { setUploadedFiles, removeUploadedFile, updateUploadedFileQuality} from './actions/actions.js';
class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
      uploadedFiles: props.uploadedFiles
    };
    
   

    document.addEventListener('keypress', (e) => {
      console.log('wow');
      switch (e.key) {
        case "1": 
          this.props.removeUploadedFile('123');
          break;
        case "2":
          this.props.setUploadedFiles([
            {
              localId: '123',
              name: '12312313/asdasdad.png',
              type: 'image/png',
              location: 'https://wow.com/test-1.png',
              quality: 50,
              file: []
            },
            {
              localId: '1234',
              name: '123123134/asdasdad-2.png',
              type: 'image/png',
              location: 'https://wow.com/test-2.png',
              quality: 52,
              file: []
            }
          ]);
          console.log(this.props);
          break;
        case "3":
          this.props.updateUploadedFileQuality('123', 22)
          break;
        default: return;
      }
        
    })
      

  }

  handleKeyPress = (event) => {
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
      <p>{this.props.examplePropOne}</p>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
            {(this.state.uploadedFiles ?
              this.state.uploadedFiles.map((fileObj, i) => (
                  <p>{fileObj.name}</p>
              ))
             : null)}
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUploadedFiles: setUploadedFiles,
    removeUploadedFile: removeUploadedFile,
    updateUploadedFileQuality: updateUploadedFileQuality
  }, dispatch);
}


const mapStateToProps = (store) => {
  console.log(store);
  return {
    uploadedFiles: store['state'].uploadedFiles
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
