import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from '../entities/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private REST_API_SERVER = environment.baseUrl;
  task: Task;
  tasks: Task[];

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

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
