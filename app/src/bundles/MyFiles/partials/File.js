import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { store } from '../../../store/index';

const styles = theme => ({
    fileContainer: {
        overflow: 'hidden',
        position: 'relative',
        padding: '15px',
        border: '1px solid #eee',
        margin: '15px 0px',
        borderRadius: '3px',
        opacity: 0,
        transition: '0.5s opacity ease-in-out',
        '&.fileItem-enter-done': {
            opacity: 1,
        },
        '&.fileItem-enter-active': {
            opacity: 1,
        
        },
    },
    fileImageContainer: {
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '15px'
    },
    fileInfoContainer: {
        width: '200px',
        height: 'auto'
    },
    fileImage: {
        display: 'block',
        maxWidth: '400px',
        height: 'auto'

    }

})


class MyFilesCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes, fileId, fileLocation, fileName } = this.props;
        return (
            <div className = {classes.fileContainer}>
                <div className = {classes.fileImageContainer}>
                    <a href = {fileLocation}>
                        <img 
                            src = {fileLocation} 
                            title={fileName} 
                            alt={`Optimized image - ${fileName}`}
                            className={classes.fileImage} />
                    </a>
                </div>
                <Divider />
                <div className = {classes.fileInfoContainer}>
                    <Typography className = {classes.fileInfoContainer}>{fileName}</Typography>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyFilesCard);