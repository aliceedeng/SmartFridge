import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import classnames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

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

class RecipeCard extends React.Component {
    /*
    Props should contain title, rid, imgLink later
     */
    state = {
        expanded: false,
        instructions: '',
        ingredients: ''
    };

    handleExpandClick = () => {
        if (!this.state.expanded) {
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
                expanded: !state.expanded,
                instructions: '',
                ingredients: ''
            }));
        }
    }

    render() {
        var actionStyle = {}
        if (this.state.expanded) {
            actionStyle.transform = 'rotate(180deg)';
            var ingredients = this.state.ingredients;
            console.log(this.state.ingredients)
            
            var ingrList = ingredients.map(function(ingr, index){
                                            return <li key={ index }>{ingr}</li>;
                                          });
        } else {
            actionStyle.transform = 'rotate(0deg)';
        }

        return (
            <div style={{ paddingBottom: '10px' }}>
                <Card>
                    <CardContent>
                    
                        <Typography  variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                    </CardContent>
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
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Ingredients</Typography>
                            <Typography paragraph>
                                <ul>
                                    {ingrList}
                                </ul>
                                
                            </Typography>
                            <Typography paragraph>
                                Instructions
                            </Typography>
                            <Typography paragraph>
                                {this.state.instructions}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

/*
<Typography component="p">
            {this.props.instructions}
</Typography>
 */
export default RecipeCard;