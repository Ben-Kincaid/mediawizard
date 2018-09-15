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
import Slider from '@material-ui/lab/Slider';
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
    submitButtonDisabled: {
        fontWeight: 'bold',
        marginTop: '2.5em',
        backgroundColor: theme.palette.black.washed,
        color: '#efefea !important',
       
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
        fontWeight: '500',
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
    qualitySlider: {
        '& button': {
            transition: 'width 250ms cubic-bezier(0.0, 0, 0.2, 1)'
      
        }
    },

    fileQuality: {
        color: 'black',
        marginTop: '5px',    
      
    },

    fileQualitySpan: {
        color: '#9b9b9b',
      
    }

})

function OptimizeImagesCard(props) {    
    const { classes, handleUpload, qualities, handleChange, uploadedFiles, deleteHandler, byteFormat, handleQualityChange } = props;
   
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
                    <Button disabled={(uploadedFiles.length <= 0 ? true : false)} classes = {{disabled: classes.submitButtonDisabled}} type="submit" name="submit" className={classes.submitButton}>
                       {`Optimize ${uploadedFiles.length} Files`}
                    </Button>
                </form>
                <div className = {classes.files}>

                    {(uploadedFiles.length > 0 ? 
                        uploadedFiles.map((fileObj, i) => (
                            
                            <div className = {classes.fileContainer} key={i}>
                               
                                <span className = {classes.fileTop}>
                                    
                                    <Typography className = {classes.fileHeader}>
                                        {fileObj.file.name}
                                    </Typography>
                                    <Typography className = {classes.fileSmall}>
                                        <span>{byteFormat(fileObj.file.size)}</span>
                                        {(fileObj.uploaded.size ? 
                                            <span>{`(${byteFormat(fileObj.uploaded.size)} after optimization)`}</span> :
                                            null
                                        )}
                                       
                                        
                                    </Typography>
                                    <Typography className = {classes.fileQuality}>
                                        Quality:
                                        <span className = {classes.fileQualitySpan}>
                                        {` ${Math.round(fileObj.quality)}%`}
                                        </span>
                                        <span><a href ={fileObj.uploaded.location} target="_blank">View!</a></span>
                                    </Typography>
                                    <RemoveFileBtn 
                                        fileKey={i}
                                        className={classes.removeBtn}
                                        deleteHandler={deleteHandler}
                                    />
                                </span>
                                <div className = {classes.fileBottom}>
                                    <Slider value={fileObj.quality}  className = {classes.qualitySlider}aria-labelledby="label" onChange={(event, value) => handleQualityChange(value, i)} />
                                </div>
                            </div>
                        ))
                        : 'no files')}
                </div>
            </div>
        </CardContent>
    )
}

export default withStyles(styles)(OptimizeImagesCard)
