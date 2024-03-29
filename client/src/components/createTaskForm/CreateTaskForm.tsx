import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';

//Mui components
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';

//React query
import { useMutation } from '@tanstack/react-query';

//Form components
import { TaskTitleField } from './_TaskTitleField';
import { TaskDescField } from './_TaskDescField';
import { TaskDateField } from './_TaskDateField';
import { TaskSelectField } from './_TaskSelectField';

//Enums
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

//Interfaces
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';

//Helper functions
import { sendApiRequest } from '../../helpers/sendApiRequests';

//Context
import { TaskStatusChangeContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const taskUpdatedContext = useContext(TaskStatusChangeContext);

  //Init mutation function
  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'POST', data),
  );

  //Function for creating task
  function createTaskHandler() {
    //If not valid
    if (!title || !date || !description) {
      return;
    }
    //Create task
    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    //And save to db
    createTaskMutation.mutate(task);
  }
  //Shows succcess message when task is created
  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);

      //Toggle context state
      taskUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => clearTimeout(successTimeout);
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '20px' }}>
          <AlertTitle>Created</AlertTitle>
          Task created successfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />
        <Stack direction="row" sx={{ width: '100%' }} spacing={2}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => setStatus(e.target.value as string)}
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
            value={priority}
            disabled={createTaskMutation.isLoading}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              { value: Priority.high, label: Priority.high.toUpperCase() },
              { value: Priority.normal, label: Priority.normal.toUpperCase() },
              { value: Priority.low, label: Priority.low.toUpperCase() },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}

        <Button
          disabled={!title || !description || !date || !status || !priority}
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Create new task
        </Button>
      </Stack>
    </Box>
  );
};
