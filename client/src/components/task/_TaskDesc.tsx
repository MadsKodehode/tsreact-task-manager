import React, { FC, ReactElement } from 'react';

//Mui components
import { Box, Typography } from '@mui/material';

//Interfaces
import { ITaskDesc } from './interfaces/ITaskDesc';

import PropTypes from 'prop-types';

export const TaskDesc: FC<ITaskDesc> = (props): ReactElement => {
  const { description = 'Lorem ipsum dolor sit amet' } = props;
  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

TaskDesc.propTypes = {
  description: PropTypes.string,
};
