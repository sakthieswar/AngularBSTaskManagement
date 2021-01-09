export class Task {
  task_id: number;
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
  priorityid: number;
}

export class Attachment {
  id: number;
  task_id: number;
  filename: string;
  filepath: string;
}
