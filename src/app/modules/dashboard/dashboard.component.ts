import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task, Attachment, TaskLogs, TaskCounts } from '../../entities/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskcounts: TaskCounts;
  public error;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTaskCounts();
  }

  getAllTaskCounts(): void {
    this.taskService.getTaskCounts().subscribe(
      (res: TaskCounts) => {
        this.taskcounts = res;
        //console.log(this.categories);
        return this.taskcounts;
      },
      (err) => {
        this.error = err;
      }
    )
  }

}
