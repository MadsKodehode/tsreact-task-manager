import React, { FC, ReactElement } from 'react';
//Material ui components
import { Box, Typography, Stack } from '@mui/material';
//Form components
import { TaskTitleField } from './_TaskTitleField';
import { TaskDescField } from './_TaskDescField';
import { TaskDateField } from './_TaskDateField';
import { TaskSelectField } from './_TaskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
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
        <TaskDateField />
        <Stack direction="row" sx={{ width: '100%' }} spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              { value: Status.todo, label: Status.todo.toUpperCase() },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              { value: Priority.high, label: Priority.high.toUpperCase() },
              { value: Priority.normal, label: Priority.normal.toUpperCase() },
              { value: Priority.low, label: Priority.low.toUpperCase() },
            ]}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
