import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_TaskHeader';
import { TaskDesc } from './_TaskDesc';
import { TaskFooter } from './_TaskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { renderPriorityBordercolor } from './helpers/renderPriorityBordercolor';
import PropTypes from 'prop-types';
export const Task: FC<ITask> = (props): ReactElement => {
  const {
    title = 'Default Title',
    date = new Date(),
    description = 'Lorem ipsum dolor si amet',
    priority = Priority.normal,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        background: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBordercolor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDesc description={description} />
      <TaskFooter onClick={onClick} onStatusChange={onStatusChange} />
    </Box>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  priority: PropTypes.string,
  status: PropTypes.string,
};
