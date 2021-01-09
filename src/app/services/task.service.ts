import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task, Attachment } from '../entities/task';
import { TaskPriority } from '../entities/task_priority';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private REST_API_SERVER = environment.baseUrl;
  task: Task;
  tasks: Task[];
  taskpriorities: TaskPriority[];
  taskstatus: TaskPriority[];
  attachments: Attachment[];


  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  register(name: string, description: string, attachment: string, priority: string, startdate: string, enddate: string, status: string) {
    const httpParams = new HttpParams().set('name', name).set('description', description).set('attachment', attachment).set('priority', priority).set('startdate', startdate).set('enddate', enddate).set('status', status);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.REST_API_SERVER + 'addnewtask.php', httpParams.toString(), {
      headers: headerOptions
    })
      .pipe(map(res => {
        alert('successfull registered.');
        // return 'successfull registered.';
        //alert(res['data']);
        //this.user = res['data'];
        //console.log(this.user);
      }));
  }

  public getAllTaskPriorityList(): Observable<TaskPriority[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getAllTaskPriority.php').pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.taskpriorities = res['data'];
        return this.taskpriorities;
      }),
      catchError(this.handleError));
  }

  public getAllTaskStatusList(): Observable<TaskPriority[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getAllTaskStatus.php').pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.taskstatus = res['data'];
        return this.taskstatus;
      }),
      catchError(this.handleError));
  }

  public getAllTaskList(): Observable<Task[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getAllTask.php').pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.tasks = res['data'];
        return this.tasks;
      }),
      catchError(this.handleError));
  }

  public getUserAllTaskList(user_id: number): Observable<Task[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getUserTask.php?user_id=' + user_id).pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.tasks = res['data'];
        return this.tasks;
      }),
      catchError(this.handleError));
  }

  public getAllTaskAttachmentList(task_id: number): Observable<Attachment[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getTaskAttachments.php?task_id=' + task_id).pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.attachments = res['data'];
        return this.attachments;
      }),
      catchError(this.handleError));
  }

  public saveTask(data) {
    let uploadURL = this.REST_API_SERVER + 'addnewtaskwithattachment.php';
    return this.http.post<any>(uploadURL, data);
  }

  public updateTask(data) {
    let uploadURL = this.REST_API_SERVER + 'updatetask.php';
    return this.http.post<any>(uploadURL, data);
  }

  //This is for download file.
  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
