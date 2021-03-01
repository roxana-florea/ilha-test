import './Plans.css';
import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Plan from './Plan';
import { useSelector, useDispatch } from 'react-redux';
import { addPlan, loadPlans } from '../../actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Plans() {
  const executeReduxAction = useDispatch();
  const plans = useSelector((state) => state.plansReducer);
  const classes = useStyles();
  const [expandedPlan, setExpandedPlan] = React.useState();

  const addNewPlan = () => {
    const newPlan = {
      planName: 'New plan' + Date.now(),
      tasks: [],
    };

    const actionToExecute = addPlan(newPlan);
    executeReduxAction(actionToExecute);

    setExpandedPlan(newPlan);
    scroll.scrollToBottom();
  };

  const toggleExpanded = (plan) => {
    if (expandedPlan && expandedPlan.planName === plan.planName) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(plan);
    }
  };

  useEffect(() => {
    const actionToExecute = loadPlans();
    executeReduxAction(actionToExecute);
  }, []);

  return (
    <div className={classes.root}>
      <div className="add-plan-container">
        <div className="empty-plan-container">
          <Card className={classes.root}>
            <CardContent>
              {plans.length > 0 ? (
                ''
              ) : (
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  You have no studies plan yet
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <div className="add-plan-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addNewPlan}
                >
                  Add a new plan
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
      </div>
      {plans.map((plan, key) => (
        <Plan
          key={plan._id}
          plan={plan}
          isExpanded={expandedPlan && plan.planName === expandedPlan.planName}
          toggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  );
}
