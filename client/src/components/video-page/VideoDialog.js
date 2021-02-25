import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const students = ['Alf', 'Aya', 'Rox'];

const videoDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List>
        <ListItem
          button
          onClick={() => handleListItemClick('Create videoroom')}
          key={'Create videoroom'}
        >
          <ListItemText primary={'Create new videoroom'} />
        </ListItem>
        {students.map((student) => (
          <ListItem
            button
            onClick={() => handleListItemClick(student)}
            key={student}
          >
            <ListItemText primary={`Connect to ${student}`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default videoDialog;
