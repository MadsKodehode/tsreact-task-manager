import React, { FC, ReactElement } from 'react';
//Mui components
import { FormControlLabel, Box, Switch, Button } from '@mui/material';
//Interfaces
import { ITaskFooter } from './interfaces/ITaskFooter';
//Enums
import { Status } from '../createTaskForm/enums/Status';
//Prop types
import PropTypes from 'prop-types';
export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
            defaultChecked={status === Status.inProgress}
          />
        }
      />
      <Button
        onClick={(e) => onClick(e, id)}
        color="success"
        size="small"
        variant="outlined"
      >
        Set Complete
      </Button>
    </Box>
  );
};

TaskFooter.propTypes = {
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
