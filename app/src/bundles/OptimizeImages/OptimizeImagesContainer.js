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
import { setUploadedFiles, removeUploadedFile} from '../../actions/actions'

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
    handleUpload(event) {
        event.preventDefault();
        alert('upload');
  
    }
    handleChange = (event) => {
        event.preventDefault();
        alert('change');

        let mappedFiles = Object.keys(event.target.files).map((file, i) => {
            return event.target.files[i];
        })
      
        this.props.setUploadedFiles(mappedFiles);
    }

    handleDelete = (key) => {
        
        this.props.removeUploadedFile(key);
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
    }, dispatch);
}


const mapStateToProps = (store) => {
   
    return {
        uploadedFiles: store['state'].uploadedFiles
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptimizeImagesContainer));
