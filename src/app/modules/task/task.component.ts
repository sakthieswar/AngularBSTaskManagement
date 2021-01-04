import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { first } from 'rxjs/operators';
import { Task } from '../../entities/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskPriority } from '../../entities/task_priority';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  public error;
  isAddEditForm: boolean = false;

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      this.router.navigateByUrl('home');
    }
    this.isAddEditForm = false;
    this.getAllTasks();
    this.getAllTaskPriority();
    this.getAllTaskStatus();
    this.getAllUserList();
    this.generateFormControls();
    
  }

  generateFormControls() {
    this.registerForm = this.formBuilder.group({
      index: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      taskpriorities: [''],
      taskstatuslist: [''],
      assignedTolist: [''],
      description: [null],
      attachment: [null],
      priority: [null],
      startdate: [null],
      enddate: [null],
      status: [null],
      priorityName: [''],
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
    alert(this.priorityId);
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
    //alert(this.statusId);
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('attachment').setValue(file);
      this.isFileChanged = true;
    }
  }

  SaveTask() {
    const formData = new FormData();

    formData.append('name', this.registerForm.get('name').value);
    formData.append('description', this.registerForm.get('description').value);
    formData.append('attachment', this.registerForm.get('attachment').value);
    formData.append('priority', this.priorityId);
    formData.append('startdate', this.registerForm.get('startdate').value);
    formData.append('enddate', this.registerForm.get('enddate').value);
    formData.append('status', this.statusId);
    formData.append('assignedto', this.assignedToUserId);

    this.taskService.saveTask(formData)
      .subscribe(
        (res) => {
          this.uploadResponse = res;
          alert('You have successfully added task: ' + this.registerForm.get('name').value);
          this.router.navigate(['/admin']);
          this.hideModals();
          //console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  hideModals(): void {
    document.getElementById('taskModal').click();
  }

  taskEdit(task, i) {
    //alert(task.decription);
    //$("#taskModal").modal('show');
    this.showAddWindow();
    //document.getElementById('taskModal').show();
    //document.getElementById('').

    this.assignedToUserId = task.assignedto;

    this.registerForm.setValue({
      index: i,
      name: task.name,
      taskpriorities: [''],
      taskstatuslist: [''],
      assignedTolist: [''],
      assignedToUserName: task.assignedto,
      description: task.decription,
      attachment: task.task_attachment,
      priority: task.priority,
      startdate: task.task_startdate,
      enddate: task.task_enddate,
      status: task.task_status,
      priorityName: null,
      statusName: null,
      assignedToUserId: task.assignedto

    })
  }
  showAddWindow() {
    this.isAddEditForm = true;
  }
  showTaskListWindow() {
    this.isAddEditForm = false;
  }

}
