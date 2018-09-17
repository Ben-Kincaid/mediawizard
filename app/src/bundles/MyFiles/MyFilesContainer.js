import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import {store} from '../../store/index';
import MyFilesCard from './MyFilesCard';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUserFiles } from '../../actions/actions.js';
import axios from 'axios';


const styles = theme => ({
    myFilesCardContainer: {
        ...theme.typography,
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px'
    },
    myFilesCard: {
        maxWidth: '900px',
        width: '100%',
        minHeight: '60vh',
       
    }

})


class MyFilesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, paged: 0}
 
    }
    componentDidMount() {
        this.setState({loading: true}, (state) => {
            this.fetchImages(this.state.paged);
        })
    }
    
    fetchImages = (paged) => {
        var accessToken = window.localStorage.getItem('token');
        if (accessToken) {

            var headers = {
                headers: {
                    'x-access-token': accessToken,
                    'paged': paged,
                }


            }
            axios.get('http://localhost:9091/api/files/view', headers)
                .then((response) => {
                   if(response.data.length > 0) {
                       setTimeout(() => {
                           this.setState({ loading: false, paged: paged }, () => {
                               this.props.setUserFiles(response.data);
                           });

                       }, 300) 
                   
             
              
                  
                    
                   } else {
                       this.props
                   }
                })
                .catch((err) => {
                    console.log(err);
                })



        } else {
            this.props.history.push('/login');
        }
    }
    handlePagination = (type) => {
     
        this.fetchImages(this.state.paged + 1)
        
    }
    render() {
        const {classes, userFiles} = this.props;
        const state = store.getState()['state'];

        
        return (
            <div className={classes.myFilesCardContainer}>
                <Card className={classes.myFilesCard}>
                    <MyFilesCard
                        userFiles={userFiles}
                        loadingStatus={this.state.loading}
                        page={this.state.paged}
                        handlePagination={this.handlePagination}
                    />
                    
                </Card>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUserFiles: setUserFiles,
    }, dispatch);
}


const mapStateToProps = (store) => {
    console.log(store);
    return {
        userFiles: store['state'].userFiles
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyFilesContainer));