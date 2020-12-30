import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { first } from 'rxjs/operators';
import { User } from '../../entities/user';
import { Task } from '../../entities/task';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  tasks: Task[];
  public error;

  constructor(private router: Router,
    private authenticationService: UserService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      this.router.navigateByUrl('home');
    }
    this.getAllUsers();
    this.getAllTasks();
  }

  showModal(): void {
    //$("#myModal").modal('show');
  }
  showTaskModal(): void {
    //$("#myModal").modal('show');
  }
  showOrderModal(): void {
    //$("#myModal").modal('show');
  }
  getAllUsers(): void {
    this.authenticationService.getAllUsersList().subscribe(
      (res: User[]) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => {
        this.error = err;
      }
    )
  }

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


}
