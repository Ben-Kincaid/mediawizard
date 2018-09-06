import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    homePageHero: {
        color: '#eee',
    },
    heroHeaderText: {
        ...theme.typography.header.large,
        ...theme.typography.header.light,
        ...theme.typography.header.media

    },
    heroSubHeader: {
        ...theme.typography.subheader.large,
        marginTop: '30px',
        ...theme.typography.subheader.media,
    }
})

class HomeContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;
        return (
            <div className = {classes.homePageHero} >
                <Typography variant ="display1" classes = {{root: classes.heroHeaderText}}>Compress & store your images for free.</Typography>
                <Typography variant="subheading" classes = {{root: classes.heroSubHeader}}>mediawizard is a one-stop solution for optimizing and storing your images from your phone or computer.</Typography>
                
            </div>
        )
    }
}

export default withStyles(styles)(HomeContainer);