import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DrawerListItem from './components/DrawerListItem';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import {store} from '../../store/index.js';





const styles = theme => ({
    drawer: {
        backgroundColor: '#eee',
        width: '260px',
        padding: '4.4em 1rem 2rem',
        zIndex: '1',
        fontSize: '16px',
        boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.1)',
        '@media(max-width: 950px)': {
            width: '230px'
        }
        
    }
})
class SidebarContainer extends Component {
    render() {
   
        const state = store.getState()['state'];
        console.log(state.auth);
        const {classes} = this.props;
        return (

            <Drawer
                variant="permanent"
               classes = {{
                   paper: classes.drawer
               }}>
                <List> 
                    {(state.auth !== null  ? 
                        this.props.userRoutes.map((item, i) => {           
                                return (
                                <DrawerListItem
                                    itemIcon={item.icon}
                                    itemPath={item.path}
                                    itemTitle={item.title} />
                                )
                        }) : 'loading...')} 
                </List>
            </Drawer>
           
        )
    }
}


export default withStyles(styles)(SidebarContainer);