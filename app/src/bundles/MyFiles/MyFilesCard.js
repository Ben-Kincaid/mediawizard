import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { store } from '../../store/index';
import File from './partials/File'
import Button from '@material-ui/core/Button';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';


const styles = theme => ({
    fileLoading: {
        ...theme.typography.card.small,
        position: 'absolute',
        top: 0,
        left: '50%',
        opacity: 1,
        transform: 'translateX(-50%)',
        transition: '0.5s opacity ease-in-out',
        '&.loadingTrans-exit-active' : {
            opacity: 0
        }
    },
    myFilesHeader: {
        ...theme.typography.card.large,
        fontWeight: 'bold',
    },
    myFilesContent: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    MyFilesCTA: {
        next: {

        },
        previous: {

        }
    }

})


function MyFilesCard(props) {
    const { classes, userFiles, loadingStatus, page, handlePagination } = props;
    const FilesMarkup = () => {
       
        var files = userFiles.slice(0).reverse().map((file, i) => (
            <CSSTransition
                key={file.fileId}
                timeout={500}
                classNames='fileItem'
            >
                <File
                    key={file.fileId}
                    fileId={file.fileId}
                    fileLocation={file.location}
                    fileName={file.name} />
            </CSSTransition>
        ));
        return files;
    }
   
    return (
        <CardContent>
            <Typography className={classes.myFilesHeader}>My Files</Typography>
            <Divider />
      
                <TransitionGroup className={classes.myFilesContent}>
                   
                   {(loadingStatus === true ? 
                        <CSSTransition
                            key={'loading'}
                            timeout={1000}
                            classNames='loadingTrans'
                        >
                            <Typography className = {classes.fileLoading}>
                                Loading
                            </Typography>
                        </CSSTransition> 
                    :
                        FilesMarkup()
                    )}
                        
                </TransitionGroup>
                <Button onClick={() => handlePagination('next')} className={classes.myFilesCTA}>Next Page</Button>
        </CardContent>
    )
}

export default withStyles(styles)(MyFilesCard);