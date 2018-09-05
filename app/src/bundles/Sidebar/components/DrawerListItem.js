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
    },
    divider: {
        background: 'red',
    },
    listItem: {
        '&.active p': {
            color: 'black'
        },
        '&.active span': {
            color: 'black'
        }
    }
})




function DrawerListItem(props) {
    const {classes} = props;
    
    return [
        <ListItem 
            component={NavLink}
            to={props.itemPath}
            className={classes.listItem}
           
            button >
            <ListItemIcon>
                <Icon className={'material-ui', classes.itemIcon}>{props.itemIcon}</Icon>
            </ListItemIcon>
            <ListItemText>
                <p className = {classes.itemText}>{props.itemTitle}</p>
            </ListItemText>
        </ListItem>,
        <Divider classes = {{root: styles.divider}}/>
    ]
}


DrawerListItem.propTypes = {
    itemIcon: PropTypes.string.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemPath: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default withStyles(styles)(DrawerListItem);