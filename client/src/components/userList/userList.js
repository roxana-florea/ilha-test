import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '50ch',
  },
}));

export default function UserList() {
  const [users, setUsers] = useState(null);
  const classes = useStyles();

  const getUsers = () => {
    axios.get('/users').then((users) => {
      setUsers(users.data);
    });
  };

  const connectToUser = (id) => {
    window.open(
      window.location.origin + `/videoroom/${id}`,
      '_blank',
      'toolbar=0,location=0,menubar=0'
    );
  };

  useEffect(getUsers, []);

  return (
    <div>
      <h1>Connect to...</h1>
      <List className={classes.root}>
        {users &&
          users.map((user) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${user.firstname} ${user.lastname}`} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    connectToUser(user._id);
                  }}
                >
                  <VideoCallIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
}
