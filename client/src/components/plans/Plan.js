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
import { useDispatch } from 'react-redux';
import { addTask, updatePlanTitle } from '../../actions';
import Warning from './messages/Warning';
import Delete from './messages/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
  const [planName, setPlanName] = React.useState(plan.planName);
  const [isPlanNameEditable, setPlanNameEditable] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [warningMessage, setWarningMessage] = React.useState(false);
  const [deleteWarningMessage, setDeleteWarningMessage] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();
  const nameForUser = planName.slice(0, planName.length - 13);

  const executeReduxAction = useDispatch();

  const openCloseAccordion = () => {
    toggleExpanded(plan);
  };

  const deleteCurrentPlan = () => {
    setDeleteWarningMessage(!deleteWarningMessage);
  };

  const savePlanTitle = () => {
    setPlanNameEditable(false);
    setPlanName(planName);
    plan.planName = planName;
    executeReduxAction(updatePlanTitle(plan));
  };

  const clearPlanTitleInput = () => {
    setPlanName('');
  };

  const planToString = () => {
    // const name = planName || 'New plan';
    // const nameForUser = name.slice(0, name.lenght - 13);

    const planTasks = plan.tasks;
    const duration = planTasks.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.duration);
    }, 0);
    const parts = planTasks.length;
    return `${nameForUser}, ${duration} min  / ${parts} parts`;
  };

  const addCurrentTask = () => {
    const newTask = {
      planId: plan._id,
      taskName: taskName,
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
    setPlanNameEditable(true);
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

                  {isPlanNameEditable ? (
                    <IconButton onClick={savePlanTitle}>
                      {' '}
                      <CheckIcon />{' '}
                    </IconButton>
                  ) : (
                    <IconButton onClick={clearPlanTitleInput}>
                      {' '}
                      <ClearIcon />{' '}
                    </IconButton>
                  )}
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
                <TasksTable tasks={plan.tasks} />
              </div>
            </CardContent>

            {warningMessage ? <Warning /> : ''}
            {deleteWarningMessage ? <Delete planId={plan._id} /> : ''}
          </Card>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
