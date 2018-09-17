import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    myFilesCardContainer: {
        ...theme.typography,
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px'
    },
    myFilesCard: {
        maxWidth: '900px',
        width: '100%',
    }

})


class MyFilesContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.myFilesCardContainer}>
                <Card className={classes.myFilesCard}>
                    
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(MyFilesContainer);