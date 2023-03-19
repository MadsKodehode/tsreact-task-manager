import React, { FC, ReactElement } from 'react';

import { Avatar, Box, Typography } from '@mui/material';

import PropTypes from 'prop-types';

interface IProfile {
  name: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
  const { name = 'John' } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          width: '95px',
          height: '95px',
          backgroundColor: 'primary.main',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h4" color="text.secondary">
          {`${name.substring(0, 1)}`}
        </Typography>
      </Avatar>
      <Typography variant="h6" color="text.primary">
        {`Welcome, ${name}!`}
      </Typography>
      <Typography variant="body1" color="text.primary">
        Manage your tasks here
      </Typography>
    </Box>
  );
};

//Checks required props at runtime in browser
Profile.propTypes = {
  name: PropTypes.string.isRequired,
};
