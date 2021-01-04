import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { TaskPriority } from '../../entities/task_priority';
import { User } from '../../entities/user';

declare var $: any;

@Component({
  selector: 'app-taskregister',
  templateUrl: './taskregister.component.html',
  styleUrls: ['./taskregister.component.css']
})
export class TaskregisterComponent implements OnInit {

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

  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService) { }

  isFileChanged: boolean = false;

  ngOnInit(): void {
    this.getAllTaskPriority();
    this.getAllTaskStatus();
    this.getAllUserList();
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      taskpriorities: [''],
      taskstatuslist: [''],
      assignedTolist:[''],
      description: [null],
      attachment: [null],
      priority: [null],
      startdate: [null],
      enddate: [null],
      status: [null],
      priorityName: [''],
      statusName: [''],
      assignedToUserName:['']
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
  onSave() {
    this.taskService.register(this.r.name.value, this.r.description.value, this.r.attachment.value, this.r.priority.value, this.r.startdate.value, this.r.enddate.value, '1')
      .pipe(first())
      .subscribe(
        data => {
          //alert('test');
          this.hideModals();
          this.router.navigate(['/admin']);
          //console.log(data);
          //this.loading = false;
          //this.hideModal();
          //this.alertService.success("Successfully login");
          //alert(data);
          //  this.router.navigate([this.returnUrl]);
        },
        error => {
          alert(error);
          //this.alertService.error(error);
          //this.loading = false;
        });
  }

  hideModals(): void {
    document.getElementById('taskModal').click();
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
      //.pipe(first())
      //.subscribe(
      //  data => {
      //    //alert('test');
      //    this.hideModals();
      //    this.router.navigate(['/admin']);
      //    //console.log(data);
      //    //this.loading = false;
      //    //this.hideModal();
      //    //this.alertService.success("Successfully login");
      //    //alert(data);
      //    //  this.router.navigate([this.returnUrl]);
      //  },
      //  error => {
      //    alert(error);
      //    //this.alertService.error(error);
      //    //this.loading = false;
      //  });

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

}
