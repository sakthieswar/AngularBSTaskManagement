export class Task {
  task_id: number;
  task_display_id: string;
  name: string;
  assignedto: string;
  description: string;
  attachment: string;
  priority: string;
  start_date: Date;
  end_date: Date;
  status: string;
  assignedtouserid: number;
  statusid: number;
  work_hours: number;
  priorityid: number;
  taskremainingtime: number;
  frequency: string;
  qcassignedto: string;
  qcassignedtouserid: number;

}

export class Attachment {
  id: number;
  task_id: number;
  filename: string;
  filepath: string;
}

export class TaskLogs {
  id: number;
  task_id: number;
  description: string;
  createdBy: string;
  createdDate: string;
}

export class TaskCounts {
  newtasks: number;
  inqc: number;
  qccompleted: number;
  returned: number;
  completed: number;
  closed: number;
}
