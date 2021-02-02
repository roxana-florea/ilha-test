import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TasksTable from './TasksTable';
import DeleteIcon from '@material-ui/icons/Delete';
import VideocamIcon from '@material-ui/icons/Videocam';
import './Plans.css';
import { deletePlan } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../actions';
import Warning from './messages/Warning';
import { nanoid } from 'nanoid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0px',
    transform: 'scale(0.8)',
    width: 260,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  'accordion-summary-content': {
    display: 'flex',
    width: '100%',
    'justify-content': 'space-between',
  },
});

export default function Plan({ plan, isExpanded, toggleExpanded }) {
  const [planName, setPlanName] = React.useState('');
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [warningMessage, setWarningMessage] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const executeReduxAction = useDispatch();
  const tasks = useSelector((state) => state.plansReducer)[plan.id].tasks;

  const openCloseAccordion = () => {
    toggleExpanded(plan.id);
  };

  const deleteCurrentPlan = () => {
    executeReduxAction(deletePlan(plan.id));
  };

  const planToString = () => {
    // const name = planName || 'New plan';
    // const planTasks = plan.tasks;
    // const duration = planTasks.values().reduce((accumulator, currentValue) => {
    //   return accumulator + parseInt(currentValue.duration);
    // }, 0);
    // const parts = planTasks.length;

    // return `${name}, ${duration} min  / ${parts} parts`;
  };

  const addCurrentTask = () => {

console.log(tasks);


    const newTask = {
      id: nanoid(),
      planId: plan.id,
      name: taskName,
      description: description,
      duration: duration,
    };

    if (
      newTask.name === '' ||
      newTask.description === '' ||
      newTask.duration === ''
    ) {
      setWarningMessage(!warningMessage);
    } else {
      executeReduxAction(addTask(newTask));
    }
    setTaskName('');
    setDescription('');
    setDuration('');
  };

  const handlePlanNameOnChange = (event) => {
    setPlanName(event.target.value);
  };

  const handleTaskNameOnChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionOnChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDurationOnChange = (event) => {
    setDuration(event.target.value);
  };

  const returnTasks = () =>{
    const vals = Object.keys(tasks).map(function(key) {
      return tasks[key];
  });
  return vals;
  }


  React.useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <Accordion expanded={expanded} onChange={openCloseAccordion}>
      <AccordionSummary>
        <div className={classes['accordion-summary-content']}>
          <Typography className={classes.heading}>{planToString()}</Typography>
          <div>
            <IconButton onClick={(event) => event.stopPropagation()}>
              <VideocamIcon />
            </IconButton>
            <IconButton onClick={deleteCurrentPlan}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>

        <div className="new-plan-container">
          <Card className={classes.root}>
            <CardContent>
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="Add a plan title"
                    value={planName}
                    onChange={handlePlanNameOnChange}
                  />
                  
                </form>
              </div>
              <br></br>
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="outlined-basic"
                    label="Task"
                    variant="outlined"
                    value={taskName}
                    onChange={handleTaskNameOnChange}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionOnChange}
                  />
                  <TextField
                    id="outlined-number"
                    label="Duration"
                    variant="outlined"
                    type="number"
                    value={duration}
                    onChange={handleDurationOnChange}
                  />
                  <IconButton aria-label="add" onClick={addCurrentTask}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </form>
                <TasksTable
                  tasks={returnTasks().filter((task) => task.planId === plan.id)}

        <Card className={classes.root}>
          <CardContent>
            <div>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Add a plan title"
                  value={planName}
                  onChange={handlePlanNameOnChange}

                />
              </form>
            </div>
            <br></br>
            <div>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Task"
                  variant="outlined"
                  value={taskName}
                  onChange={handleTaskNameOnChange}
                />
                <TextField
                  id="outlined-textarea"
                  label="Description"
                  multiline
                  variant="outlined"
                  value={description}
                  onChange={handleDescriptionOnChange}
                />
                <TextField
                  id="outlined-number"
                  label="Duration"
                  variant="outlined"
                  type="number"
                  value={duration}
                  onChange={handleDurationOnChange}
                />
                <IconButton aria-label="add" onClick={addCurrentTask}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </form>
              <TasksTable
                tasks={tasks.filter((task) => task.planId === plan.id)}
              />
            </div>
          </CardContent>

          <IconButton aria-label="delete">
            <DeleteIcon onClick={deleteCurrentPlan} />
          </IconButton>

          {warningMessage ? <Warning /> : ''}
        </Card>
      </AccordionDetails>
    </Accordion>
  );
}
