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
import { connect } from 'react-redux'
import OptimizeImagesCard from './OptimizeImagesCard'
import { bindActionCreators } from 'redux'
import { setUploadedFiles, removeUploadedFile, updateUploadedFileQuality, updateUploadedFileLocation} from '../../actions/actions'
import axios from 'axios';
import { subscribeToUploadProg } from '../../ws';

const styles = theme => ({
    optimizeCardContainer: {
        ...theme.typography,
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px'
    }
}) 


class OptimizeImagesContainer extends Component {
    constructor(props) {
        super(props);
        
    }

    sendFiles() {
        const state = store.getState()['state'];
        const accessToken = window.localStorage.getItem('token');

        var headers = {
            headers: {
                'x-access-token': accessToken,
                'content-type': 'multipart/form-data'
            }
        }

        var fd = new FormData();
        var files = state.uploadedFiles;
        for(var i = 0; i < files.length; i++) {
            fd.append('file', files[i].file);
            fd.append('quality', files[i].quality);
        }

        axios.post(`http://localhost:9091/api/files/upload`, fd, headers)
            .then((response) => {
                console.log(response);
            })
    }

    handleUpload = (event) => {
        const state = store.getState()['state'];
        event.preventDefault();
        subscribeToUploadProg((response) => {
            console.log('SOCKET: uploaded image')
            console.log(response);
            this.props.updateUploadedFileLocation(response.location, response.size, response.key)
        });
        this.sendFiles();
  
    }
    handleChange = (event) => {
        event.preventDefault();
      
        const state = store.getState()['state'];
        let mappedFiles = Object.keys(event.target.files).map((file, i) => {
            return {
                file: event.target.files[i],
                quality: 100,
                uploaded: {
                  location: null,
                  size: null,  
                }
            }
        })
      
        this.props.setUploadedFiles(mappedFiles);
    }

    handleDelete = (key) => {
        
        this.props.removeUploadedFile(key);
    }

    handleQualityChange = (value, key) => {
     
       this.props.updateUploadedFileQuality(value, key);
    }
    byteFormat(bytes) {
        console.log(bytes)
        switch (true) {
            case (bytes <= 1024):
                return `${bytes} Bytes`;
                break;
            case (bytes <= 1048576):
                return `${Math.round(bytes / 1024)} Kb`;
                break;
            case (bytes <= 1073741824):
                return `${(bytes / 1048576).toFixed(2)} Mb`;
                break;
            default:
                return `Size not found`;
        }
    }
    render() {
        const state = store.getState()['state'];
        const {classes} = this.props;
        return (
            <div className = {classes.optimizeCardContainer} >
                <Card className = {classes.optimizeCard} >
                    <OptimizeImagesCard 
                        handleUpload={this.handleUpload}
                        handleChange={this.handleChange}
                        uploadedFiles={this.props.uploadedFiles}
                        deleteHandler={this.handleDelete}
                        byteFormat={this.byteFormat}
                        handleQualityChange={this.handleQualityChange}
                    />
                </Card>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUploadedFiles: setUploadedFiles,
        removeUploadedFile: removeUploadedFile,
        updateUploadedFileQuality: updateUploadedFileQuality,
        updateUploadedFileLocation: updateUploadedFileLocation
    }, dispatch);
}


const mapStateToProps = (store) => {
   
    return {
        uploadedFiles: store['state'].uploadedFiles
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptimizeImagesContainer));
