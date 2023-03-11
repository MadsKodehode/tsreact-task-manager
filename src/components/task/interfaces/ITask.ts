import { ITaskHeader } from './ITaskHeader';
import { ITaskDesc } from './ITaskDesc';
import { ITaskFooter } from './ITaskFooter';

export interface ITask extends ITaskHeader, ITaskDesc, ITaskFooter {
  id?: string;
  priority?: string;
  status?: string;
}
