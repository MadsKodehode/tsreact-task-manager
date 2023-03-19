import React, { FC, ReactElement } from 'react';
//Mui components
import { Box, Typography, Avatar } from '@mui/material';
//Interfaces
import { ITaskCounter } from './interfaces/ITaskCounter';
//Enums
import { Status } from '../createTaskForm/enums/Status';
//Helper functions
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

import PropTypes from 'prop-types';
export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { status = Status.completed, count = 0 } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          background: 'transparent',
          border: '5px solid',
          width: '100px',
          height: '100px',
          marginBottom: '15px',
          borderColor: `${emitCorrectBorderColor(status)}`,
        }}
      >
        <Typography color="#ffffff" variant="h4">
          {count}
        </Typography>
      </Avatar>
      <Typography
        color="#ffffff"
        fontWeight="bold"
        fontSize="20px"
        variant="h5"
      >
        {emitCorrectLabel(status)}
      </Typography>
    </Box>
  );
};

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
};
