import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { store } from '../../store/index.js';

import RemoveFileBtn from './partials/RemoveFileBtn';


const styles = theme => ({
    optimizeHeader: {
        ...theme.typography.card.large,
        fontWeight: 'bold',
    },
    uploadButton: {
        fontWeight: 'bold',
        marginTop: '2.5em',
        marginRight: '2em',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    submitButton: {
        fontWeight: 'bold',
        marginTop: '2.5em',
        backgroundColor: theme.palette.black.main,
        color: '#eee',
        '&:hover': {
            backgroundColor: theme.palette.black.washed,
        }
    },
    filesContainer: {

    },
    fileContainer: {
        padding: '5px',
        '&:first-of-type': {
            borderTop: '1px solid #eee',
        },
        borderBottom: '1px solid #eee',
        position: 'relative',
    },
    fileHeader: {
        ...theme.typography.subheader.medium,
        display: 'inline-block',
    },
    fileSmall: {
        ...theme.typography.subheader.small,
        display: 'inline-block',
        marginLeft: '5px',
    },
    fileTop: {

    },
    files: {
        border: '1px solid #eee',
        margin: '1em 0',
        padding: '1em',
    },
    hidden: {
        display: 'none',
    },
})
function OptimizeImagesCard(props) {    
    const { classes, handleUpload, handleChange, uploadedFiles, deleteHandler } = props;
    console.log(uploadedFiles)
    return (
        <CardContent>
            <Typography className = {classes.optimizeHeader}>Optimize Images</Typography>
            <Divider />
            <div className = {classes.filesContainer}>
                <form onSubmit={handleUpload} encrypt="multipart/form-data">
                    <input
                        accept="image/*"
                        className={classes.hidden}
                        id="flat-button-file"
                        onChange={handleChange}
                        multiple
                        type="file"
                    />
                    <label htmlFor="flat-button-file">
                        <Button component="span" className={classes.uploadButton}>
                            Choose File(s)
                        </Button>
                    </label>
                    <Button component="span" type="submit" name="submit" className={classes.submitButton}>
                       {`Optimize ${uploadedFiles.length} Files`}
                    </Button>
                </form>
                <div className = {classes.files}>

                    {(uploadedFiles.length > 0 ?
                        uploadedFiles.map((file, i) => (
                            
                            <div className = {classes.fileContainer} key={i}>
                               
                                <span className = {classes.fileTop}>
                                    
                                    <Typography className = {classes.fileHeader}>
                                        {file.name}
                                    </Typography>
                                    <Typography className = {classes.fileSmall}>
                                        {`${file.size / 1000} KB`}
                                    </Typography>
                                    <RemoveFileBtn 
                                        fileKey={i}
                                        className={classes.removeBtn}
                                        deleteHandler={deleteHandler}
                                    />
                                </span>
                            </div>
                        ))
                        : 'no files')}
                </div>
            </div>
        </CardContent>
    )
}

export default withStyles(styles)(OptimizeImagesCard)
