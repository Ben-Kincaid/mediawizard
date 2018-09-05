import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import HeaderContainer from './bundles/Header/HeaderContainer';
import SidebarContainer from './bundles/Sidebar/SidebarContainer';
import FooterContainer from './bundles/Footer/FooterContainer';
import HomeContainer from './bundles/Home/HomeContainer';
import LoginContainer from './bundles/Login/LoginContainer';
import MyProfileContainer from './bundles/MyProfile/MyProfileContainer';
import MyFilesContainer from './bundles/MyFiles/MyFilesContainer';
import RegisterContainer from './bundles/Register/RegisterContainer';
import OptimizeImagesContainer from './bundles/OptimizeImages/OptimizeImagesContainer';

import { setUploadedFiles, removeUploadedFile, updateUploadedFileQuality} from './actions/actions.js';
import Button from '@material-ui/core/Button';
import './main.css';
import Grid from '@material-ui/core/Grid';

import { withTheme } from '@material-ui/core/styles';
class App extends Component {
  constructor(props) {
    super(props);
    console.log(props.theme.palette.primary);
    
/*
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
        
    }) */
      

  }

  
  render() {
    return (
      <div className="root">
      
          
          
          <HeaderContainer className = "header" />
          <SidebarContainer className = "sidebar" theme={this.props.theme}/>
        
          <Route 
            path="/"  exact
            render={(props) => <HomeContainer {...props} className = "homePage"/>}
          />

          <Route
            path="/login" 
            render={(props) => <LoginContainer {...props} className="LoginPage" />}
          />

          <Route
            path="/my-profile"
            render={(props) => <MyProfileContainer {...props} className="myProfilePage" />}
          />

          <Route
            path="/my-files"
            render={(props) => <MyFilesContainer {...props} className="myFilesPage" />}
          />

          <Route
            path="/register"
            render={(props) => <RegisterContainer {...props} className="registerPage" />}
          />

          <Route
            path="/optimize-images"
            render={(props) => <OptimizeImagesContainer {...props} className="optimizeImagesPage" />}
          />

          <FooterContainer className = "footer"/>
   
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



export default withTheme(connect(mapStateToProps, mapDispatchToProps))(App);
