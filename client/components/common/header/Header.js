import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//import * as authService from '../../../services/authService';

const drawerWidth = 250;

const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'None',
    color: 'White',
    fontSize: '30 px'
}


const styles = theme => ({
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 45
    },
    menuButtonShift: {
        marginLeft: -15
    },
    flex: {
        flex: 1
    }

});

class Header extends Component {

    /*
    logOut(e) {
        e.preventDefault();
        this.props.actions.logout();
    }*/

    render() {
        const {classes, navDrawerOpen, handleToggleDrawer} = this.props;
        var updateState = this.props.updateState;
        return (
            <div>
                <AppBar className={classNames(classes.appBar, navDrawerOpen && classes.appBarShift)}>
                    <Toolbar>
                        <button onClick={() => updateState('recipe')} style={buttonStyle}>search by recipe</button>
                        <Typography type="title" className={classes.flex}>

                        </Typography>
                        <button onClick={() => updateState('ingr')} style={buttonStyle}>search by ingredient(s)</button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    //actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header))
