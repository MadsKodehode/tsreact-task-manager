import React, { FC, ReactElement, useContext, useEffect } from 'react';

//Mui components
import { Grid, Box, Alert, LinearProgress } from '@mui/material';

//Date formatter
import { format } from 'date-fns';

//Components
import { TaskCounter } from '../taskCounter/TaskCounter';
import { Task } from '../task/Task';

//React query
import { useQuery, useMutation } from '@tanstack/react-query';

//Helpers
import { sendApiRequest } from '../../helpers/sendApiRequests';
import { countTasks } from './helpers/countTasks';

//Interfaces
import { ITaskApi } from './interfaces/ITaskApi';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';

//Enums
import { Status } from '../createTaskForm/enums/Status';

//Context
import { TaskStatusChangeContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const taskUpdatedContext = useContext(TaskStatusChangeContext);

  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>(
      'http://localhost:3200/tasks',
      'GET',
    );
  });

  //Update task
  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'PUT', data),
  );
  //Refetch when context updates
  useEffect(() => {
    refetch();
  }, [taskUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      taskUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  //Handler function for change event
  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  //Handler function for mark complete
  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }
  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status of tasks for: {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            count={data ? countTasks(data, Status.todo) : undefined}
            status={Status.todo}
          />
          <TaskCounter
            count={data ? countTasks(data, Status.inProgress) : undefined}
            status={Status.inProgress}
          />
          <TaskCounter
            count={data ? countTasks(data, Status.completed) : undefined}
            status={Status.completed}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {error && <Alert severity="error">Error fetching task</Alert>}
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">You dont have any tasks yet.</Alert>
            )}
          </>
          {isLoading ? (
            <LinearProgress />
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((each, index) => {
              return each.status === Status.todo ||
                each.status === Status.inProgress ? (
                <Task
                  key={index + each.priority}
                  id={each.id}
                  title={each.title}
                  description={each.description}
                  date={new Date(each.date)}
                  priority={each.priority}
                  status={each.status}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                />
              ) : (
                false
              );
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
