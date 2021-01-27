import './Plans.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { nanoid } from 'nanoid';
import Plan from './Plan';
import { useSelector, useDispatch } from 'react-redux';
import { addPlan } from '../../actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Plans() {
    const executeReduxAction = useDispatch();
    const plans = useSelector(state => state.plansReducer);
    const classes = useStyles();



    const addNewPlan = () => {
        const newPlan = {
            id: nanoid(),
            name: 'New plan'
        }
        executeReduxAction(addPlan(newPlan));
    }

    return (
        <div className={classes.root}>
            <div className="add-plan-container">
                <div className="empty-plan-container">
                    <Card className={classes.root}>
                        <CardContent>


                            {plans.length>0 ? "" : <Typography className={classes.title} color="textSecondary" gutterBottom>
                                You have no studies plan yet
                        </Typography>
                            }

                        </CardContent>
                        <CardActions>
                            <div className="add-plan-button">
                                <Button variant="contained" color="primary" onClick={addNewPlan}>
                                    Add a new plan
                        </Button>
                            </div>
                        </CardActions>
                    </Card>
                </div>
            </div>
            {plans.map((plan, key) => <Plan key={plan.id} plan={plan} />)}
        </div>
    );
}
