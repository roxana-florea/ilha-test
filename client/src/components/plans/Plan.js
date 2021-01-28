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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  const tasks = useSelector((state) => state.tasksReducer);

  const openCloseAccordion = () => {
    toggleExpanded(plan.id);
  };

  const deleteCurrentPlan = () => {
    executeReduxAction(deletePlan(plan.id));
  };

  const planToString = () => {
    const name = planName || 'New plan';
    const planTasks = tasks.filter((task) => task.planId === plan.id);
    const duration = planTasks.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.duration);
    }, 0);
    const parts = planTasks.length;

    return `${name}, ${duration} min  / ${parts} parts`;
  };

  const addCurrentTask = () => {
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
    setTaskName("");
    setDescription("");
    setDuration("");
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

  React.useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <Accordion expanded={expanded} onChange={openCloseAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{planToString()}</Typography>
        <div id="video-icon">
                    <IconButton>
                      <VideocamIcon />
                    </IconButton>
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
                  tasks={tasks.filter((task) => task.planId === plan.id)}
                />
              </div>
            </CardContent>

            <IconButton aria-label="delete">
              <DeleteIcon onClick={deleteCurrentPlan} />
            </IconButton>

            {warningMessage ? <Warning /> : ''}
          </Card>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
