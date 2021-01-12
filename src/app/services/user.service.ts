import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../entities/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private REST_API_SERVER = environment.baseUrl;
  user: User;
  users: User[];

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    login(useremail: string, password: string) {
    //alert(username +' password: ' + password);
      const httpParams = new HttpParams().set('user', useremail).set('pass', password);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.REST_API_SERVER + 'login.php', httpParams.toString(), {
      headers: headerOptions
    })
      .pipe(map(res => {
        //alert(res['data']);
        this.user = res['data'];
        //this.user = res['data'];
        console.log(this.user[0].user_name);
        localStorage.setItem('user', this.user[0].user_id.toString());
        localStorage.setItem('role', this.user[0].role.toString());
        localStorage.setItem('username', this.user[0].user_name.toString());
        //alert(localStorage.getItem('username'));


        //alert(this.user[0].user_id);
        //console.log(this.user[0].user_id);
        //localStorage.setItem('user', this.user[0].userid.toString());
        //this.router.navigate(['/home']);
        //alert(this.user[0].fname);
        //return this.user;

        // login successful if there's a jwt token in the response
        // if (user) {
        //     alert(user.username);
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        // }

        //return user;
      }));
  }

    register(username: string, email: string, password: string, contact_no: string, isactive: string, created_by: string, created_date: string) {
    const httpParams = new HttpParams().set('user_name', username).set('user_email', email).set('password', password).set('contact_no', contact_no).set('isactive', isactive).set('created_by', created_by).set('created_date', created_date);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.REST_API_SERVER + 'adduser.php', httpParams.toString(), {
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

  public getAllUsersList(): Observable<User[]> {
    // alert(this.REST_API_SERVER + 'read.php');

    return this.http.get(this.REST_API_SERVER + 'getAllUserlist.php').pipe(
      // return this._http.get('http://localhost/read.php').pipe(
      map((res) => {
        this.users = res['data'];
        //console.log(this.users);
        return this.users;
      }),
      catchError(this.handleError));
  }

  public saveUser(data) {
    let uploadURL = this.REST_API_SERVER + 'adduser.php';
    return this.http.post<any>(uploadURL, data);
  }

  public updateUser(data) {
    let uploadURL = this.REST_API_SERVER + 'updateuser.php';
    return this.http.post<any>(uploadURL, data);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

}
