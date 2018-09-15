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
    '@keyframes upload-spin': {
        '0%': {transform: 'rotate(0deg)', color: '#b8b8b8'},
        '50%': {color: theme.palette.primary.main},
        '100%': { transform: 'rotate(-360deg)', color: '#b8b8b8'}
    },
    deleteIcon: {
        position: 'absolute',
        right: 0,
        top: '5px',
        cursor: 'pointer',
        color: '#b8b8b8',
        transition: '0.2s color ease-in-out',
        '&:hover': {
            color: theme.palette.error.main,
        }
    },
    downloadIcon: {
        position: 'absolute',
        right: 0,
        top: '5px',
        cursor: 'pointer',
        color: theme.palette.success.main,
        transition: '0.2s color ease-in-out',
        '&:hover': {
            color: theme.palette.success.dark,
        }
    },
   loadingIcon: {
       animation: 'upload-spin 2s ease-in-out infinite',
        position: 'absolute',
        right: 0,
        top: '5px',
        cursor: 'pointer',
        
        transition: '0.2s color ease-in-out',
       
    },
})
function onClick() {
    alert('clicked!');
}
function RemoveFileBtn(props) {
    const {classes, deleteHandler, fileKey, fileLocation, fileLoaded, loading} = props;
    const buttonMarkup = (loadedState) => {
        if(!fileLocation) {
            switch(loadedState) {
                case null:
                    return (
                        <Icon
                            onClick={() => deleteHandler(fileKey)}
                            className={['material-ui', classes.deleteIcon]}
                            title="Remove file">delete_forever</Icon> 
                    )
                    break;
                case true:
                    return (
                        <Icon
                            className={['material-ui', classes.loadingIcon]}
                            title="Remove file">cached</Icon> 
                    )
                    break;
                case false:
                    return (<p>Loaded!</p>);
                    break;
            }
        } else {
            return (
                <a href = {fileLocation} >
                    <Icon
                        className={['material-ui', classes.downloadIcon]}
                        title="Download file">cloud_download</Icon > 
                </a>
            )
        }
    
    }
    return (
        <div>
            {buttonMarkup(loading)}
{/*             
            <a href = {fileLocation} >
                <Icon
                    className={['material-ui', classes.downloadIcon]}
                        title="Download file">cloud_download</Icon> 
            </a> :
                <Icon
                    onClick={() => deleteHandler(fileKey)}
                    className={['material-ui', classes.deleteIcon]}
                    title="Remove file">delete_forever</Icon> 
            )} */}
        </div>
      
       
    )
}

export default withStyles(styles)(RemoveFileBtn);