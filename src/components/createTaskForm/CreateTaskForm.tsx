import React, { FC, ReactElement } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { TaskTitleField } from './_TaskTitleField';
import { TaskDescField } from './_TaskDescField';
export enum FieldVariants {
  standard = 'standard',
  outlined = 'outlined',
  filled = 'filled',
}

export const CreateTaskForm: FC = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      <Typography mb={2} component="h2" variant="h6">
        Create Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField disabled />
        <TaskDescField />
      </Stack>
    </Box>
  );
};
