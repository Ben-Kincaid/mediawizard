import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CSSTransition from 'react-transition-group/CSSTransition';

class NotFoundContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var responseText = (this.props.status === 403 ? '403 Forbidden - You are not authorized to view this page.' : '404 Not Found - Couldn`t find page')
        return (
            <p>{responseText}</p>    
        )
    }
}
export default NotFoundContainer;