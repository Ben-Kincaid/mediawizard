import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MyProfileCard from './MyProfileCard';

const styles = theme => ({
    profileCardContainer: {
        ...theme.typography,
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px'
    },
    profileCard: {
        maxWidth: '900px',
        width: '100%',
    }
})

class MyProfileContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.profileCardContainer}>
                <Card classNamee={classes.profileCard}>
                    <MyProfileCard/>
                </Card>
       
            </div>
        )
    }
}


export default withStyles(styles)(MyProfileContainer);

