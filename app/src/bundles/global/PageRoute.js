import React, { Component } from 'react';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import PageContainer from './PageContainer';

export default function PageRoute(props) {
 
    return (
        <Route 
            path={props.path}
            render={(renderProps) =>
                <PageContainer containerName = {props.containerName}>
                    {React.createElement(props.component, renderProps)}
                </PageContainer>
                
            } />
    )
}
