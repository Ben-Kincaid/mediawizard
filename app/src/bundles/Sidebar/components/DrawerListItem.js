import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

var active;

const styles = theme => ({
    itemIcon: {
        color: 'gray',
        transition: [
            ['color', '250ms']
        ]
    },
    itemText: {
        color: '#3b3952',
        fontWeight: 'bold',
        margin: '5px 0',
    },
    divider: {
        background: 'red',
    },
    listItem: {
        padding: '0',
        '& a.active p': {
            color: 'black'
        },
        '& a.active span': {
            color: 'black'
        }
    },
    listAnchor: {
        padding: '20px',
        width: '100%',
        display: 'flex',
        textDecoration: 'none'
    }
})




function DrawerListItem(props) {
    const {classes} = props;
    
    return [
        <li>
            <ListItem 
                className={classes.listItem}
                button >
                <NavLink className = {classes.listAnchor} to ={props.itemPath} >
                    <ListItemIcon>
                        <Icon className={['material-ui', classes.itemIcon]}>{props.itemIcon}</Icon>
                    </ListItemIcon>
                    <ListItemText>
                        <p className = {classes.itemText}>{props.itemTitle}</p>
                    </ListItemText>
                </NavLink>
            </ListItem>
        <Divider classes = {{root: styles.divider}}/>
        </li>
    ]
}


DrawerListItem.propTypes = {
    itemIcon: PropTypes.string.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemPath: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default withStyles(styles)(DrawerListItem);