import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {ExpandMore, CheckBoxOutlineBlankTwoTone, CheckBoxTwoTone} from '@material-ui/icons';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import inFridge from '../../utils/inFridge';
import inCookbook from '../../utils/inCookbook';
import {bindActionCreators} from 'redux';
import {addRecipe, removeRecipe} from '../../actions/recipeAction';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const placeholderImgs = [
    'https://payload.cargocollective.com/1/14/466639/13802007/cake_black_1250.jpg',
    'https://payload.cargocollective.com/1/14/466639/13802007/winecheesev02-03_1250.jpg',
    'https://payload.cargocollective.com/1/14/466639/13802007/food_stomachache-01_1250.png',
    'https://payload.cargocollective.com/1/14/466639/13802007/pancakes-21-21_5_1250.png',
    'https://payload.cargocollective.com/1/14/466639/13802007/fruitti_tutti-new-05_1250.jpg'
];

var classes = {
    actions: 'actions',
    expand: 'expand',
    expandOpen: 'expandOpen',

};
const mediaStyle = {
    height: 0,
    paddingTop: '56.25%'
};


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto'
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

class RecipeCard extends React.Component {
    /*
     Props should contain title, rid, picLink later
     */
    constructor(props) {
        super(props);
        this.trueLink = this.getTrueLink();
        this.state = {
                expanded: false,
                instructions: '',
                ingredients: '',
                open: false
            };
    }

    //for snackbar: when adding to fridge and removing from fridge
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        this.setState({ open: false });
      };

    // returns a link to display with this recipe card
    // corresponds to a randomly chosen stock image from one of several
    // if no image is defined
    getTrueLink() {
        let trueLink;
        if (this.props.picLink) {
            if (this.props.picLink.includes('nophoto')) {
                const rand = Math.floor(Math.random() * 5);
                trueLink = placeholderImgs[rand];
            } else {
                trueLink = this.props.picLink;
            }
        } else {
            const rand = Math.floor(Math.random() * 5);
            trueLink = placeholderImgs[rand];
        }

        return trueLink;
    }

    handleAddClick = (adding) => {
        if (adding) {
            this.props.addRecipe({
                title: this.props.title,
                rid: this.props.rid,
                picLink: this.props.picLink
            });
            this.setState({ open: true }); //trigger snackbar
        } else {
            console.log(this.props.rid);
            this.props.removeRecipe(this.props.rid);
        }
    }

    handleExpandClick = () => {
        if (!this.state.expanded && this.state.ingredients === '') {
            var request = '/api/recipe/rid/' + this.props.rid;
            axios.get(request)
                .then(res => {
                    this.setState(state => ({
                        expanded : !state.expanded,
                        instructions: res.data.instructions,
                        ingredients: res.data.ingredients
                    }));
                });
        } else {
            this.setState(state => ({
                expanded: !state.expanded
            }));
        }
    }

    //<div style={{ paddingBottom: '10px' }}>

    render() {
        var actionStyle = {};
        let cookbookButton;
        if (inCookbook(this.props.cookbookContents, this.props.rid)) {
            cookbookButton =
                <IconButton
                    
                    onClick={(e) => this.handleAddClick(false)}
                    aria-label="add to cookbook"
                    color='secondary'
                >
                    <Favorite />
                </IconButton>;
        } else {
            cookbookButton =
                <IconButton
                    
                    onClick={(e) => this.handleAddClick(true)}
                    aria-label="add to cookbook"
                >
                    <FavoriteBorder />
                </IconButton>;
        }
        let ingrList;
        if (this.state.expanded) {
            actionStyle.transform = 'rotate(180deg)';
            let ingredients = this.state.ingredients;

            ingrList = ingredients.map(function(ingr, index) {
                let liStyle = {};
                if (inFridge(this.props.fridgeContents, ingr.USDA_ID)) {
                    liStyle.fontWeight = 'bold';
                } else {
                    liStyle.fontWeight = 'normal';
                }

                return <li style={liStyle} key={index}>{ingr.INPUT}</li>;
            }.bind(this));

        } else {
            actionStyle.transform = 'rotate(0deg)';
        }

        let img = <CardMedia
            style = {mediaStyle}
            image={this.trueLink}
            title="Recipe image"/>;
        return (
            
            <Grid item xs={4}>

                <Card>
                    <CardContent>
                        <Typography  variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        
                    </CardActions>
                    {img}
                    <Divider variant="middle" />
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            style = {actionStyle}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMore />
                        </IconButton>
                        {cookbookButton}
                        <Snackbar
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          open={this.state.open}
                          autoHideDuration={3000}
                          onClose={this.handleClose}
                          message={<span>added to cookbook!</span>}
                        >
                          
                        </Snackbar>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Ingredients</Typography>
                                <ul>
                                    {ingrList}
                                </ul>
                            <Typography paragraph>
                                Instructions
                            </Typography>
                            <Typography paragraph>
                                {this.state.instructions}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return ({
        fridgeContents: state.fridge.contents,
        cookbookContents: state.cookbook.contents
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addRecipe: addRecipe,
        removeRecipe: removeRecipe
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);