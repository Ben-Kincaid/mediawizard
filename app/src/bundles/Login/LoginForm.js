import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
    loginHeader: {
        ...theme.typography.card.large,
        fontWeight: 'bold',

    },
    loginForm: {

    },
    loginSubmit: {
        ...theme.typography.card.submit,
        backgroundColor: theme.palette.primary.main,

    },
    textField: {
        ...theme.typography.card.input,
        display: 'block'

    }
})

function LoginForm(props) {
    const {classes, handleLoginSubmit, handleChange, loginName, validationText} = props;

    return (
        <CardContent>
            <Typography className={classes.loginHeader}>Login to mediawizard</Typography>

            <Divider />
            <form className={classes.loginForm} onSubmit={handleLoginSubmit}>
                <TextField
                    id="name"
                    label="Username or Email"
                    className={classes.textField}
                    value={loginName}
                    onChange={handleChange('loginName')}
                    margin="normal"
                />
                <TextField
                    id="password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    onChange={handleChange('loginPass')}
                />
                <Button
                    variant="contained"
                    className={classes.loginSubmit}
                    type="submit">
                    Login
                </Button>
                <p>{validationText}</p>
            </form>
        </CardContent>
    )
}


export default withStyles(styles)(LoginForm);