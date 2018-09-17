import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginForm from './LoginForm';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUserCredentials} from '../../actions/actions.js';
import { withTheme } from '@material-ui/core/styles';

import axios from 'axios';
const styles = theme => ({
    loginCardContainer: {
        ...theme.typography,
        display: 'block',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px'
    },
    loginCard: {
        maxWidth: '900px',
        width: '100%',
    },
})

class LoginContainer extends Component {
    constructor(props) {
     
        super(props);
        this.state = {
            loginName: null,
            loginPass: null,
            validationText: null,
        }
    }
    
    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value})
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();


        axios.post('http://localhost:9091/api/users/login', {
            name: this.state.loginName,
            password: this.state.loginPass
        }).then((response) => {
            
            if(response.status === 200) {
                localStorage.setItem("token", response.data.token);
                this.setState({validationText: 'successfully logged in!'})
                this.props.setUserCredentials(response.data.user.username, response.data.user.email, true);
                console.log(response);
                setTimeout(() => {
                    this.props.history.push('/my-profile');   
                }, 500)
            }
        }).catch((err) => {
            this.setState({ validationText: 'Incorrect credentials. Please try again.' })
        })
    }
    render() {
    const {classes} = this.props;
    
        return (
            <div className={classes.loginCardContainer}>
                <Card classNamee = {classes.loginCard}>
                    <LoginForm
                        handleLoginSubmit={this.handleLoginSubmit}
                        handleChange={this.handleChange}
                        validationText={this.state.validationText}
                    />
                </Card>
            </div>
            
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setUserCredentials: setUserCredentials,
    }, dispatch);
}


const mapStateToProps = (store) => {
    console.log(store);
    return {
        user: store['state'].user
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginContainer));