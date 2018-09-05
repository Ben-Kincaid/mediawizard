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


var styles = theme => ({
    listItem: {
        background: 'blue',
        '&.active': {
            backgroundColor: 'red'
        },
    
        
    },
})

function DrawerListItem(props) {
    const {classes} = props;
    return [
        <ListItem 
            component={NavLink}
            to={props.itemPath}
            className={classes.listItem}
            activeClassName={'active'}
            button >
            
            <ListItemIcon>
                <Icon className="material-icons">{props.itemIcon}</Icon>
            </ListItemIcon>
            <ListItemText >
                {props.itemTitle}
            </ListItemText>
          
        </ListItem>,
        <Divider />
    ]
}


DrawerListItem.propTypes = {
    itemIcon: PropTypes.string.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemPath: PropTypes.string.isRequired
}

export default withStyles(styles)(DrawerListItem);