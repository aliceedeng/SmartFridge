import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 250;

const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'None',
    color: 'White',
    fontSize: '30 px'
};

const titleStyle = {
    color: 'White',
    fontSize:'20px',
    marginLeft:'auto',
    marginRight:'auto'
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

const RecipeButton = withRouter(({ history }) => (
    <button
        style={buttonStyle}
        type='button'
        onClick={() => { history.push('/recipes'); }}
    >
        search by recipe
    </button>
));


const IngredientButton = withRouter(({ history }) => (
    <button
        style={buttonStyle}
        type='button'
        onClick={() => { history.push('/ingredients'); }}
    >
        search by ingredient
    </button>
));

const CookbookButton = withRouter(({ history }) => (
    <button
        style={buttonStyle}
        type='button'
        onClick={() => { history.push('/cookbook'); }}
    >
        my cookbook
    </button>
));

class Header extends Component {

    /*
    logOut(e) {
        e.preventDefault();
        this.props.actions.logout();
    }*/


    render() {
        const {classes, navDrawerOpen, handleToggleDrawer} = this.props;

return (
            <div>
                <AppBar className={classNames(classes.appBar, navDrawerOpen && classes.appBarShift)}>
                    <Toolbar>
                        <RecipeButton />
                        <IngredientButton />
                        <Typography type="title" style={titleStyle}>
                            smart fridge
                        </Typography>
                        <CookbookButton/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    // actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));
