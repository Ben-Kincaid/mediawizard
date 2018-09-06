import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    headerBar: {
        backgroundColor: theme.palette.black.main,
        position: 'fixed',
    },
    headerText: {
        color: '#eee',
        fontSize: '2.5em',
        fontWeight: 'bold',
        paddingLeft: '10px',
        textTransform: 'lowercase',
    }
})




class HeaderContainer extends Component {
    constructor(props) {
        super(props);
 
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="absolute" classes = {{root: classes.headerBar}}>
                <Toolbar>
                    <Typography variant="title" className={classes.headerText} noWrap>
                        MediaWizard
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(HeaderContainer);