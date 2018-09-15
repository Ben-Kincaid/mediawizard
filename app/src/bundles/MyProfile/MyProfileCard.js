import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {store} from '../../store/index.js';
import MyProfile from './MyProfileCard';

const styles = theme => ({
    profileHeader: {
        ...theme.typography.card.large,
        fontWeight: 'bold',
    },
    profileSmall: {
        ...theme.typography.card.small,
    }
});

function MyProfileCard(props) {
    const {classes} = props;
    const state = store.getState()['state'];
    return (
        <CardContent>
            <Typography className = {classes.profileHeader}>{(state.user ? state.user.username : 'Loading...')}</Typography>
            <Divider />
            <Typography className = {classes.profileSmall}>{(state.user ? state.user.email : 'Loading...')}</Typography>
        </CardContent>
        
    )
    
}

export default withStyles(styles)(MyProfileCard);

