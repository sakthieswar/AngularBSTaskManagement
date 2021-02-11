import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { first } from 'rxjs/operators';
import { Task, Attachment, TaskLogs } from '../../entities/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskPriority } from '../../entities/task_priority';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [DatePipe]
})
export class TaskComponent implements OnInit {
  task: Task;
  tasks: Task[];
  attachments: Attachment[];
  tasklogs: TaskLogs[];
  public error;
  isAddEditForm: boolean = false;

  taskSearchForm: FormGroup;
  registerForm: FormGroup;
  taskpriorities: TaskPriority[];
  taskstatuslist: TaskPriority[];
  assignedTolist: User[];
  priorityName: string;
  priorityId: string;
  statusName: string;
  statusId: string;
  assignedToUserName: string;
  assignedToUserId: string;
  uploadResponse;

  isFileChanged: boolean = false;

  selectedAssigneeID: number = 1;
  selectedTaskPriorityID: number = 1;
  selectedTaskStatusID: number = 1;

  isAdminRole: boolean = false;
  isTaskCompleted: boolean = false;
  isEditScreen: boolean = false;
  todayDate = new Date().toISOString();
  user_id: string;

  currentRate: number = 0;

  taskDisplayID: string = '';
  taskTitle: string = '';
  taskAssignedTo: string = '';
  taskPriority: string = '';
  taskStatus: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService) {
    //this.todayDate = this.datePipe.transform(this.todayDate, 'M/d/yy h:mm a');
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy/M/d hh:mm');
  }

  ngOnInit(): void {
    //alert(this.todayDate);
    let user = JSON.parse(localStorage.getItem('user'));
    let loginrole = JSON.parse(localStorage.getItem('role'));
    if (user == null) {
      this.router.navigateByUrl('home');
    } else {
      this.getAllTaskPriority();
      this.getAllTaskStatus();
      //this.getAllUserList(); // This can be enabled if user wants to load their tasks alone.
      this.getAllTasks();
      this.generateFormControls();
      this.isAddEditForm = false;
      this.isTaskCompleted = false;
      this.user_id = user;

      //this.selectedAssigneeID = 1;
      //this.selectedTaskPriorityID = 1;
      //this.selectedTaskStatusID = 1;
      if (loginrole == 1) {
        this.isAdminRole = true;
        this.getAllTasks();
        this.getAllUserList();
        //getUserAllTaskList
      } else {
        this.getAllUserTasks(user);
      }
    }



  }

  generateFormControls() {
    this.registerForm = this.formBuilder.group({
      index: [{ value: null, disabled: true }],
      task_id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      taskpriorities: [''],
      taskstatuslist: [''],
      assignedTolist: [''],
      description: [null],
      attachment: [null],
      priority: [null],
      startdate: [],
      enddate: [null],
      status: [null],
      priorityName: [''],
      statusName: [''],
      assignedToUserName: [''],
      workhours: ['']
    });

    this.taskSearchForm = this.formBuilder.group({
      taskstatuslist: [''],
      assignedTolist: [''],
      startdate: [],
      statusName: [''],
      assignedToUserName: ['']
    });
  }

  getAllTaskPriority(): void {
    this.taskService.getAllTaskPriorityList().subscribe(
      (res: TaskPriority[]) => {
        this.taskpriorities = res;
        //console.log(this.categories);
        return this.taskpriorities;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  changePriority(event: Event) {
    this.priorityName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.priorityId = event.target['options']
    [event.target['options'].selectedIndex].value;
    //alert(this.priorityId);
  }

  getAllTaskStatus(): void {
    this.taskService.getAllTaskStatusList().subscribe(
      (res: TaskPriority[]) => {
        this.taskstatuslist = res;
        //console.log(this.categories);
        return this.taskstatuslist;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  changeStatus(event: Event) {
    this.statusName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.statusId = event.target['options']
    [event.target['options'].selectedIndex].value;
    //alert(this.statusName);
    if (this.statusName == "Completed" || this.statusName == "In Progress") {
      this.isTaskCompleted = true;
    } else {
      this.isTaskCompleted = false;
    }
  }

  getAllUserList(): void {
    this.userService.getAllUsersList().subscribe(
      (res: User[]) => {
        this.assignedTolist = res;
        //console.log(this.categories);
        return this.assignedTolist;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  changeAssignedToUser(event: Event) {
    this.assignedToUserName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.assignedToUserId = event.target['options']
    [event.target['options'].selectedIndex].value;
  }

  get r() { return this.registerForm.controls; }
  get s() { return this.taskSearchForm.controls; }

  getAllTasks(): void {
    this.taskService.getAllTaskList().subscribe(
      (res: Task[]) => {
        this.tasks = res;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  getAllUserTasks(user_id: number): void {
    this.taskService.getUserAllTaskList(user_id).subscribe(
      (res: Task[]) => {
        this.tasks = res;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  getTaskAttachments(task_id: number): void {
    this.taskService.getAllTaskAttachmentList(task_id).subscribe(
      (res: Attachment[]) => {
        this.attachments = res;
        //alert(this.attachments[0].filepath);
      },
      (err) => {
        this.error = err;
      }
    )
  }

  getTaskLogs(task_id: number): void {
    this.taskService.getAllTaskLogs(task_id).subscribe(
      (res: TaskLogs[]) => {
        this.tasklogs = res;
        //alert(this.attachments[0].filepath);
      },
      (err) => {
        this.error = err;
      }
    )
  }
  getTaskDetailsByID(task_id: number): void {
    this.taskService.getTaskDetailsByID(task_id).subscribe(
      (res: Task) => {
        this.task = res[0];
        this.taskDisplayID = this.task.task_display_id;
        this.taskTitle = this.task.name;
        this.taskAssignedTo = this.task.assignedto;
        this.taskPriority = this.task.priority;
        this.taskStatus = this.task.status;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  getTaskWorkLog(task_id: number) {
    this.getTaskLogs(task_id);
    this.getTaskDetailsByID(task_id);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('attachment').setValue(file);
      this.isFileChanged = true;
    }
  }

  SaveTask() {
    const formData = new FormData();

    let index = this.registerForm.getRawValue().index;
    let statusID;
    let assignedUserID;
    let priorityId;
    //alert(this.user_id);

    formData.append('name', this.registerForm.get('name').value);
    formData.append('description', this.registerForm.get('description').value);
    formData.append('attachment', this.registerForm.get('attachment').value);
    //formData.append('priority', this.priorityId);

    //formData.append('startdate', this.todayDate);
    formData.append('enddate', this.registerForm.get('enddate').value);

    //formData.append('assignedto', this.assignedToUserId);
    formData.append('created_by', this.user_id);

    if (this.statusId == undefined) {
      statusID = this.selectedTaskStatusID.toString()
    } else {
      statusID = this.statusId;
    }

    if (this.assignedToUserId == undefined) {
      assignedUserID = this.selectedAssigneeID.toString()
    } else {
      assignedUserID = this.assignedToUserId;
    }

    if (this.priorityId == undefined) {
      priorityId = this.selectedTaskPriorityID.toString()
    } else {
      priorityId = this.priorityId;
    }

    formData.append('status', statusID);
    formData.append('assignedto', assignedUserID);
    formData.append('priority', priorityId);


    if (index != null) {
      //alert(' task id: ' + this.registerForm.get('task_id').value);
      formData.append('task_id', this.registerForm.get('task_id').value);
      formData.append('workhours', this.registerForm.get('workhours').value);
      formData.append('startdate', this.registerForm.get('startdate').value);


      this.taskService.updateTask(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            alert('You have successfully updated the task: ' + this.registerForm.get('name').value);
            //this.router.navigate(['/task']);
            window.location.reload();
            //this.hideModals();
            //console.log(res);
          },
          (err) => {
            alert(this.registerForm.get('attachment').value);
            if (this.registerForm.get('attachment').value == "")
              window.location.reload();
            else
              console.log(err.message);
          }
        );
    }

    else {
      //formData.append('status', this.selectedTaskStatusID.toString());
      formData.append('startdate', this.todayDate);
      this.taskService.saveTask(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            alert('You have successfully added task: ' + this.registerForm.get('name').value);
            //this.router.navigate(['/task']);
            window.location.reload();
            //this.hideModals();
            //console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  hideModals(): void {
    document.getElementById('taskModal').click();
  }

  taskEdit(task) {
    //alert(task.assignedto);
    //$("#taskModal").modal('show');
    this.showAddWindow();
    this.isEditScreen = true;
    this.getTaskAttachments(task.task_id);

    this.selectedAssigneeID = task.assigned_to_userid;
    this.selectedTaskPriorityID = task.task_priority_id;
    this.selectedTaskStatusID = task.task_status;

    this.registerForm.setValue({
      index: task.task_id,
      task_id: task.task_id,
      name: task.name,
      taskpriorities: [],
      taskstatuslist: [],
      assignedTolist: [],
      assignedToUserName: task.assignedto,
      description: task.description,
      attachment: task.task_attachment,
      priority: task.priority,
      startdate: task.task_startdate,
      enddate: task.task_enddate,
      status: task.task_status,
      priorityName: null,
      statusName: null,
      workhours: []
    })
  }
  showAddWindow() {
    this.isAddEditForm = true;
    this.resetForm();
  }
  showTaskListWindow() {
    this.isAddEditForm = false;
    this.isEditScreen = false;
  }

  resetForm() {
    //alert(this.todayDate);
    this.registerForm.reset();
    this.isFileChanged = false;
    this.isEditScreen = false;
    this.registerForm.patchValue({
      startdate: this.todayDate,
      enddate: this.todayDate
    });
  }

  //This is for search.
  name: any;
  task_display_id: any;
  searchTask() {
    if (this.name == "") {
      this.getAllTasks();
    }
    else {
      this.tasks = this.tasks.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  searchTaskID() {
    if (this.task_display_id == "") {
      this.getAllTasks();
    }
    else {
      this.tasks = this.tasks.filter(res => {
        return res.task_display_id.toLocaleLowerCase().match(this.task_display_id.toLocaleLowerCase());
      });
    }
  }
  clearSearch() {    
    this.name = "";
    this.task_display_id = "";
    this.getAllTasks();
  }

  //This is for sorting.
  key: string = "task_enddate";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //This is for downloading.
  download(url: string): Observable<Blob> {
    //alert(url);
    return this.taskService.download(url);
  }

  //download(url: string): void {
  //  this.taskService
  //    .download(url)
  //    .subscribe(blob => saveAs(blob, 'archive.txt'))
  //  //.subscribe(blob => {
  //  //  const a = document.createElement('a')
  //  //  const objectUrl = URL.createObjectURL(blob)
  //  //  a.href = objectUrl
  //  //  a.download = 'archive.zip';
  //  //  a.click();
  //  //  URL.revokeObjectURL(objectUrl);
  //  //})
  //}

  hideModalAttachments(): void {
    document.getElementById('TaskAttachmentModal').click();
  }
  hideModalTaskLogs(): void {
    document.getElementById('TaskLogsModal').click();
  }


  getDataDiff(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    console.log({ day: days, hour: hours, minute: minutes, second: seconds });
  }
  //var diff = getDataDiff(new Date(inputJSON.created_date), new Date(inputJSON.current_time));
  //console.log(diff);
  GetTaskReportData() {
    let user_id = this.assignedToUserId == undefined ? '' : this.assignedToUserId;
    let statusId = this.statusId == undefined ? '' : this.statusId;
    let startdate = this.taskSearchForm.get('startdate').value;
    startdate = startdate == null ? '' : startdate;

    this.taskService.getFilteredTasks(user_id, statusId, startdate).subscribe(
      (res: Task[]) => {
        this.tasks = res;
        if (this.tasks.length > 0) {

        }
        //console.log(this.tasks);
      },
      (err) => {
        this.error = err;
      }
    )
  }

}
