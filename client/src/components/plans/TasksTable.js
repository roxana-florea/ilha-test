import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteTask, updateTask } from '../../actions';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TasksTable({ tasks }) {
  const classes = useStyles();
  const executeReduxAction = useDispatch();
  const [taskEditable, setTaskEditable] = React.useState('');
  const [taskTitle, setTaskTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('');

  const deleteCurrentTask = (task) => {
    executeReduxAction(deleteTask(task));
  };

  const editTask = (task) => {
    setTaskTitle(task.name);
    setDescription(task.description);
    setDuration(task.duration);
    setTaskEditable(task.id);
  };

  const saveTask = (task) => {
    const savedTask = {
      id: task.id,
      planId: task.planId,
      name: taskTitle,
      description: description,
      duration: duration,
    };
    executeReduxAction(updateTask(savedTask));
    setTaskEditable('');
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          {tasks.length <= 0 ? (
            ''
          ) : (
            <TableRow>
              <TableCell align="left">Task</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Duration&nbsp;(min)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.name}>
              <TableCell component="th" scope="row">
                {taskEditable === task.id ? (
                  <TextField
                    id="outlined-basic"
                    label="Task"
                    variant="outlined"
                    margin="dense"
                    value={taskTitle}
                    onChange={(ev) => setTaskTitle(ev.target.value)}
                  />
                ) : (
                  task.name
                )}
              </TableCell>
              <TableCell align="right">
                {taskEditable === task.id ? (
                  <TextField
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    variant="outlined"
                    margin="dense"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                ) : (
                  task.description
                )}
              </TableCell>
              <TableCell align="right">
                {taskEditable === task.id ? (
                  <TextField
                    id="outlined-number"
                    label="Duration"
                    variant="outlined"
                    type="number"
                    margin="dense"
                    value={duration}
                    onChange={(ev) => {
                      setDuration(ev.target.value);
                    }}
                  />
                ) : (
                  task.duration
                )}
              </TableCell>
              <TableCell align="right">
                {taskEditable === task.id ? (
                  <IconButton>
                    {' '}
                    <CheckCircleIcon onClick={() => saveTask(task)} />
                  </IconButton>
                ) : (
                  <IconButton aria-label="check">
                    <EditIcon
                      id="edit-task-icon"
                      onClick={() => editTask(task)}
                    />
                  </IconButton>
                )}

                <IconButton aria-label="delete">
                  <DeleteIcon onClick={() => deleteCurrentTask(task)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
