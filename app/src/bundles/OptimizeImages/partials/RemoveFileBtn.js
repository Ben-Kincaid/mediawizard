import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';


const styles = theme => ({
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#b8b8b8',
        transition: '0.2s color ease-in-out',
        '&:hover': {
            color: theme.palette.error.main,
        }
    }
})
function onClick() {
    alert('clicked!');
}
function RemoveFileBtn(props) {
    const {classes, deleteHandler, fileKey} = props;
    return (
     
        <Icon onClick={() => deleteHandler(fileKey)} className={['material-ui', classes.deleteIcon]} title = "Remove file from optimization">delete_forever</Icon>
       
    )
}

export default withStyles(styles)(RemoveFileBtn);