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
import { subscribeToUploadProg } from './ws';
import PageRoute from './bundles/global/PageRoute';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import {store} from './store/index'
import bgConfig from './config/starBgConfig.js';
import routes from './config/routeConfig.js';
class App extends Component {
  constructor(props) {
    super(props);
  
    window.particlesJS("star-bg", bgConfig);
    
   
  }

  componentDidMount() {
    this.checkAuth().then((response) => {
      this.props.setUserCredentials(response.username, response.email, true);
    }).catch((err) => {
      console.log(err);
      this.props.setUserCredentials(null, null, false)
    })
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('token');

      if (accessToken) {
        jwt.verify(accessToken, "THISISMYSECRET", (err, decoded) => {
          if(err) reject(err);
          
          var headers = {headers: {'x-access-token': accessToken}}
          axios.get(`http://localhost:9091/api/users/validate/${decoded.id}`, headers).then((response) => {
            resolve(response.data);
          }).catch((err) => {
            reject(err);
          })
        })
      } else {
        reject('No token present')
      }
    })

    
  }
  render() {
    
    const userRoutes = routes.filter((route, i) => {
      const state = store.getState()['state'];
      if(state.auth == true) {
        return (route.location == 'authorized' || route.location == 'all' ? true : false)
      } else {
        return (route.location == 'unauthorized' || route.location == 'all' ? true : false)
      } 
    })

    return (
      <div className="root">          
        <HeaderContainer containerName = "header" />
        <SidebarContainer containerName = "sidebar" userRoutes = {userRoutes}/>
        <Route render={({location}) => (
        
          <TransitionGroup className="page-sections">
            <CSSTransition key={location.key} timeout={300} classNames="pageTrans">  
              <Switch location={this.props.location}>
                {(userRoutes.map((route, i) => (
                  <Route
                    path={route.path}
                    render={(renderProps) =>
                      <PageContainer containerName={route.containerName}>
                        {React.createElement(route.component, renderProps)}
                      </PageContainer>
                    } />
                )))}
               
            </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
        <FooterContainer containerName = "footer"/>
   
      </div>
    )
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
    user: store['state'].user,
    auth: store['state'].auth,
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
