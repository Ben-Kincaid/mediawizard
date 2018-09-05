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


const sideBarItems = [
    {
        title: 'Home',
        path: '/home',
        icon: 'home'
    },
    {
        title: 'My Profile',
        path: '/my-profile',
        icon: 'account_circle',
    },
    {
        title: 'My Files',
        path: '/my-files',
        icon: 'image'
    },
    {
        title: 'Optimize Media',
        path: '/optimize-media',
        icon: 'broken_image',
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: 'time_to_leave'
    }
]


const styles = theme => ({
    drawer: {
        backgroundColor: '#eee',
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
               }}>
                <List>
                    {sideBarItems.map((item, i) => (
                        <DrawerListItem
                            itemIcon={item.icon}
                            itemPath={item.path}
                            itemTitle={item.title} />
                    ))}
                </List>
            </Drawer>
           
        )
    }
}

export default withStyles(styles)(SidebarContainer);