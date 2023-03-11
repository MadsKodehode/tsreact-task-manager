import { Priority } from '../../createTaskForm/enums/Priority';

export const renderPriorityBordercolor = (priority: string): string => {
  switch (priority) {
    case Priority.normal:
      return 'info.light';
    case Priority.low:
      return 'grey.800';
    case Priority.high:
      return 'error.light';
    default:
      return 'info.light';
  }
};
