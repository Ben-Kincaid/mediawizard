import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { store } from '../../store/index.js';
import { connect } from 'react-redux'
import OptimizeImagesCard from './OptimizeImagesCard'
import { bindActionCreators } from 'redux'
import { updatePendingStatus,  setUploadedFiles, removeUploadedFile, updateUploadedFileQuality, updateUploadedFileLocation} from '../../actions/actions'
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

        // subscribe to upload progress socket - responds with uploaded file 
        // and thenm updates the file object in redux store with location and size
        // based on the key/index.
        subscribeToUploadProg((response) => {
            this.props.updateUploadedFileLocation(response.location, response.size, response.base64, response.key)
        });
    }
    
    // handles request to upload unprocessed files
    sendFiles = (uploadedFiles) => {
        // get the local access token
        const accessToken = window.localStorage.getItem('token');

        // set up headers with form-data content type and JWT token
        var headers = {
            headers: {
                'x-access-token': accessToken,
                'content-type': 'multipart/form-data'
            }
        }

        // Initialize new FormData object
        var fd = new FormData();
        // get all file objects that are not yet uploaded
        var files = uploadedFiles.filter((file, i) => (file.uploaded.location || file.uploaded.location ? false : true));
        //for each un-uploaded file object, append data to FormData object
        for(var i = 0; i < files.length; i++) {
            fd.append('file', files[i].file);
            fd.append('quality', files[i].quality);
        }

        //Send the formdata + headers to /files/upload endpoint to upload to S3
        axios.post(`http://localhost:9091/api/files/upload`, fd, headers)
            .then((response) => {
                // in the response, all we have to do is change pending to false
                // sockets handle everything else
                this.changePending(false)
            })
    }

    // fired on form submit
    handleUpload = (event) => {
        event.preventDefault();
        const {uploadedFiles} = this.props;
        //change pending status to true
        this.changePending(true);
        // initialize sending of files
        this.sendFiles(uploadedFiles);
        
    }

    // When a new file is added via file picker
    handleChange = (event) => {
        event.preventDefault();

        //convert each file in drawer to redux-friendly object
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
        
        //set uploaded files to the new mapped files object list
        this.props.setUploadedFiles(mappedFiles);
    }

    // when remove button is pressed
    handleDelete = (key) => {
        // remove the local uploadedFile based on its key/index
        this.props.removeUploadedFile(key);
    }

    // Update redux's quality attribute for a file
    handleQualityChange = (value, key) => {
       // updates the stored file objects quality based on its key/index
       this.props.updateUploadedFileQuality(value, key);
    }

    // format Byte verbage based on size.
    byteFormat(bytes) {
        switch (true) {
            case (bytes <= 1024):
                return `${bytes} Bytes`;
            case (bytes <= 1048576):
                return `${Math.round(bytes / 1024)} Kb`;
            case (bytes <= 1073741824):
                return `${(bytes / 1048576).toFixed(2)} Mb`;
            default:
                return `Size not found`;
        }
    }

    // Change pending status - if a files are being uplaoded or not
    changePending(status) {
        this.props.updatePendingStatus(status);
    }


    render() {
        const {classes, uploadedFiles, uploadPending} = this.props;
        
        // get list of optimized files
        let optimizedFiles = uploadedFiles.filter((file, i) => {
            const { size, location } = file.uploaded;
            return (size | location ? true : false);
        }, 0)

        // returns optimize button text based on current drawer file status
        const optimizeBtnText = (files) => {
            // if there are no files in drawer at all
            if(files.length == 0) {
                return 'No files chosen';
            } else if (files.length == optimizedFiles.length) { // if all files are already uplaoded
                return 'Optimized!'
            } else { // if there are files but not all are uploaded
                return `Optimize ${files.length - optimizedFiles.length} files`;
            }
        }

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
                        optimizeBtnText={() => optimizeBtnText(uploadedFiles)}
                        pending={uploadPending}
                        optimizedFiles={optimizedFiles}
                        changePending={this.changePending}
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
        updateUploadedFileLocation: updateUploadedFileLocation,
        updatePendingStatus: updatePendingStatus, 
    }, dispatch);
}


const mapStateToProps = (store) => {
   
    return {
        uploadedFiles: store['state'].uploadedFiles,
        uploadPending: store['state'].uploadPending
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptimizeImagesContainer));
