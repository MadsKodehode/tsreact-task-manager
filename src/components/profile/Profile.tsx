import React, { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

export const Profile: FC = (): ReactElement => {
  return (
    <Avatar
      sx={{
        width: '55px',
        height: '55px',
      }}
    >
      MK
    </Avatar>
  );
};
