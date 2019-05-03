import React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {ExpandMore, CheckBoxOutlineBlankTwoTone, CheckBoxTwoTone} from '@material-ui/icons';

import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import classnames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {addIngredient, removeIngredient} from '../../actions/ingredientAction';

var classes = {
    actions: 'actions',
    expand: 'expand',
    expandOpen: 'expandOpen',

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
const inFridge = function(fridge, id) {
    let index = fridge.map((ingredient) => (ingredient.id)).indexOf(id);

    return index !== -1;
}

class IngredientCard extends React.Component {
    /*
    Props should contain title, rid, imgLink later
     */
    state = {
        expanded: false,
        calories: 0,
        protein: 0,
        sodium: 0,
        sugar: 0,
        cholesterol: 0
    };

    handleAddClick = () => {
        if (inFridge(this.props.fridgeContents, this.props.id)) {
            this.props.removeIngredient(this.props.id);
        } else {
            this.props.addIngredient({
                name: this.props.name,
                id: this.props.id
            });
        }
    }

    handleExpandClick = () => {
        if (!this.state.expanded) {
            const request = '/api/ingredient/facts/' + this.props.id;
            axios.get(request)
                .then(res => {
                    const sugar = res.data.SUGAR ? res.data.SUGAR : 'Unknown';
                    const calories = res.data.CAL ? res.data.CAL : 'Unknown';
                    const sodium = res.data.SODIUM ? res.data.SODIUM : 'Unknown';
                    const protein = res.data.PROTEIN ? res.data.PROTEIN.toFixed(2) : 'Unknown';
                    const cholesterol = res.data.CHOLESTEROL ? res.data.CHOLESTEROL : 'Unknown';

                    this.setState(state => ({
                        expanded : !state.expanded,
                        calories: calories,
                        sodium: sodium,
                        protein: protein,
                        sugar: sugar,
                        cholesterol: cholesterol
                    }));
                });
        } else {
            this.setState(state => ({
                expanded: !state.expanded,
                calories: 0,
                protein: 0,
                sodium: 0,
                cholesterol: 0,
                sugar: 0
            }));
        }
    }

    render() {
        let actionStyle = {};
        let checkboxIcon;
        if (this.state.expanded) {
            actionStyle.transform = 'rotate(180deg)';
        } else {
            actionStyle.transform = 'rotate(0deg)';
        }
        if (inFridge(this.props.fridgeContents, this.props.id)) {
            checkboxIcon = <CheckBoxTwoTone />;
        } else {
            checkboxIcon = <CheckBoxOutlineBlankTwoTone />;
        }
        
return (
            <div style={{ paddingBottom: '10px' }}>
                <Card>
                    <CardContent>
                        <Typography  variant="h5" component="h2">
                            {this.props.name}
                        </Typography>
                    </CardContent>
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
                        <IconButton
                            className={classes.expand}
                            style = {{transform : 'rotate(0deg)'}}
                            onClick={this.handleAddClick}
                            aria-label="Add to fridge"
                        >
                            {checkboxIcon}
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <List
                                component="nav"
                                subheader={<ListSubheader component='div'>Nutrition Facts</ListSubheader>}
                            >
                                <ListItem>
                                    <ListItemText primary='Calories' secondary={this.state.calories} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Sugar' secondary={this.state.sugar} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Protein' secondary={this.state.protein} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Sodium' secondary={this.state.sodium} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Cholesterol' secondary={this.state.sugar} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return(
        {
            fridgeContents: state.fridge.contents
        }
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addIngredient: addIngredient,
        removeIngredient: removeIngredient
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);