import React, { Component } from 'react';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import PageContainer from './PageContainer';

const MWRoute = (route, authRequired, isAuthorized) => (
    authRequired && isAuthorized ? 
    <Route
        path={route.path}
        render={(renderProps) =>
            <PageContainer containerName={route.containerName}>
                {React.createElement(route.component, renderProps)}
            </PageContainer>
        } /> :
        <p>WOW</p>
)


 export default MWRoute;