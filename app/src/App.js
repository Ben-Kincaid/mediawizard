import React, { Component } from 'react';
import './App.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderContainer from './bundles/Header/HeaderContainer';
import SidebarContainer from './bundles/Sidebar/SidebarContainer';
import FooterContainer from './bundles/Footer/FooterContainer';
import HomeContainer from './bundles/Home/HomeContainer';
import LoginContainer from './bundles/Login/LoginContainer';
import MyProfileContainer from './bundles/MyProfile/MyProfileContainer';
import MyFilesContainer from './bundles/MyFiles/MyFilesContainer';
import RegisterContainer from './bundles/Register/RegisterContainer';
import OptimizeImagesContainer from './bundles/OptimizeImages/OptimizeImagesContainer';
import PageContainer from './bundles/global/PageContainer';
import {setUserCredentials} from './actions/actions.js';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';


import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import bgConfig from './config/starBgConfig.js';

class App extends Component {
  constructor(props) {
    super(props);

    window.particlesJS("star-bg", bgConfig);
    

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

  componentDidMount() {
    this.checkAuth().then((response) => {
      this.props.setUserCredentials(response.username, response.email);
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('token');

      if (accessToken) {
        jwt.verify(accessToken, "THISISMYSECRET", (err, decoded) => {
          var headers = {
            headers: {
              'x-access-token': accessToken,

            }


          }
          axios.get(`http://localhost:9091/api/users/validate/${decoded.id}`, headers).then((response) => {
            resolve(response.data);
          }).catch((err) => {
            reject(err);
          })
        })
      }
    })

    
  }
  render() {
    
    return (
      <div className="root">
      
          
          
        <HeaderContainer containerName = "header" />
        <SidebarContainer containerName = "sidebar"/>
        
        <Route render = {({location}) => (
         
          <TransitionGroup className="page-sections">
            <p>{location.pathname}</p>
            <CSSTransition key={location.key} timeout={300} classNames="pageTrans">  
              <Switch location={location}>
             
                <Route 
                  path="/home"  exact
                  render={(props) => 
                    <PageContainer containerName="homePage">
                      <HomeContainer {...props} />
                    </PageContainer>
                  } />

                <Route
                  path="/login" 
                  render={(props) => 
                    <PageContainer containerName="LoginPage">
                      <LoginContainer {...props} />
                    </PageContainer>
                  } />

                <Route
                  path="/my-profile"
                  render={(props) => 
                    <PageContainer containerName="myProfilePage">
                      <MyProfileContainer {...props}/>
                    </PageContainer>
                  } />

                <Route
                  path="/my-files"
                  render={(props) => 
                    <PageContainer containerName="myFilesPage">
                      <MyFilesContainer {...props}/>
                    </PageContainer>
                  } />

                <Route
                  path="/register"
                  render={(props) => 
                    <PageContainer containerName="registerPage" >
                      <RegisterContainer {...props} />
                    </PageContainer>
                  }/>

                <Route
                  path="/optimize-media"
                  render={(props) => 
                    <PageContainer containerName="optimizeImagesPage">
                      <OptimizeImagesContainer {...props}  />
                    </PageContainer>
                  } />
                <Route
                  path="/logout"
                  render={(props) => {
                    if (window.localStorage.getItem('token')) {
                      window.localStorage.removeItem('token');
                      this.props.setUserCredentials(null, null);
                      return (<Redirect to="/login" />)
                    } else {
                      return (<Redirect to="/login" />)
                    }
                   
                  }} />
          
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
        <FooterContainer containerName = "footer"/>
   
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUserCredentials: setUserCredentials
  }, dispatch);
}


const mapStateToProps = (store) => {
  console.log(store);
  return {
    user: store['state'].user
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
