import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Box, Typography, Chip } from '@mui/material';
import { ITaskHeader } from './interfaces/ITaskHeader';

export const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
  const { title = 'Default Title', date = new Date() } = props;
  return (
    <Box display="flex" width="100%" justifyContent="space-between" mb={2}>
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip label={format(date, 'PPP')} variant="outlined"></Chip>
      </Box>
    </Box>
  );
};

TaskHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
