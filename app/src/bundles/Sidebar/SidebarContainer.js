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
const styles = theme => ({
    drawer: {
        backgroundColor: theme.palette.primary.extraLight,
        width: '25%',
        paddingTop: '4.4rem',
        padding: '4.4rem 1rem 2rem',
        zIndex: '1',
        maxWidth: '300px',
        minWidth: '230px'
    }
})
class SidebarContainer extends Component {
    constructor(props) {
        super(props);
        console.log("CONTEXT");
        console.log(this.context);
    }

    render() {
        const {classes} = this.props;
        return (
            
            <Drawer
                variant="permanent"
               classes = {{
                   paper: classes.drawer
               }}
            >
                <List>
                    <DrawerListItem 
                        itemIcon="home" 
                        itemTitle="Home" 
                        itemPath = "/home"/>
                    <DrawerListItem 
                        itemIcon="account_circle" 
                        itemTitle="My Profile" 
                        itemPath = "/my-profile"/>
                    <DrawerListItem 
                        itemIcon="image" 
                        itemTitle="My Files" 
                        itemPath="/my-files" />
                    <DrawerListItem 
                        itemIcon="broken_image" 
                        itemTitle="Optimize Media" 
                        itemPath="/optimize-media" />
                    <DrawerListItem 
                        itemIcon="time_to_leave" 
                        itemTitle="Logout" 
                        itemPath="/logout" />
                   
                </List>
                    
                  
            </Drawer>
           
        )
    }
}

export default withStyles(styles)(SidebarContainer);