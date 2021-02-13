import { Component, OnInit } from '@angular/core';
import { TaskPriority } from '../../entities/task_priority';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, Attachment } from '../../entities/task';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public error;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService) { }

  taskSearchForm: FormGroup;
  taskpriorities: TaskPriority[];
  taskstatuslist: TaskPriority[];
  assignedTolist: User[];
  tasks: Task[];
  priorityName: string;
  priorityId: string;
  statusName: string;
  statusId: string;
  assignedToUserName: string;
  assignedToUserId: string;
  startdate: string;
  //selectedTaskStatusID: string;

  isTaskResult: boolean = false;


  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let loginrole = JSON.parse(localStorage.getItem('role'));
    if (user == null) {
      this.router.navigateByUrl('home');
    } else {
      this.getAllTaskPriority();
      this.getAllTaskStatus();
      this.getAllUserList();
      this.generateFormControls();
    }
  }

  generateFormControls() {
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

  get s() { return this.taskSearchForm.controls; }

  GetTaskReportData() {   

    let user_id = this.assignedToUserId == undefined ? '' : this.assignedToUserId;
    let statusId = this.statusId == undefined ? '' : this.statusId;
    let startdate = this.taskSearchForm.get('startdate').value;
    startdate = startdate == null ? '' : startdate;

    this.taskService.getFilteredTasks(user_id, statusId, startdate).subscribe(
      (res: Task[]) => {
        this.tasks = res;
        if (this.tasks.length > 0) {
          this.isTaskResult = true;

        }
        console.log(this.tasks);
      },
      (err) => {
        this.error = err;
      }
    )
  }
}
