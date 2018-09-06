import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CSSTransition from 'react-transition-group/CSSTransition';

const styles = theme => ({
    pageContainer: {
        padding: '90px 30px 30px 320px',
        position: 'relative',
        // When the enter transition starts, set the opacity to 0 and 
        // move it to the left 20px. Also set it as absolute to prevent page shifting 
        // during transition.
        '&.pageTrans-enter-active': {
            opacity: 0,
            top: 0, left: 0,
            position: 'absolute',
            transform: 'translateX(-20px)', 

        },
        // Then, when the enter timeout ends, add opacity of 1 and transform back 
        // to its regular position - also set the element back to being relative
        '&.pageTrans-enter-done': {
            position: 'relative',
            opacity: 1,
            transform: 'translateX(0px)',
            transition: '0.3s all',
          
        },
        '&.pageTrans-exit': {
            opacity: 0,
            transform: 'translateX(20px)',
            transition: '0.3s all',
        },
        '@media(max-width: 950px)': {
            padding: '95px 30px 30px 290px'
        }
        
    }
})

class PageContainer extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {

        const {children, containerName, classes, location} = this.props;
        return (
            <section className={`${containerName} ${classes.pageContainer}`}>
                {children}
            </section>
        )
    }
}


PageContainer.PropTypes = {
    containerName: PropTypes.string.isRequired
}

export default withStyles(styles)(PageContainer);
