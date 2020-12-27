import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../entities/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  private REST_API_SERVER = environment.baseUrl;
  user: User;

  login(useremail: string, password: string) {
    //alert(username +' password: ' + password);
    const httpParams = new HttpParams().set('user', useremail).set('pass', password);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.REST_API_SERVER + 'login.php', httpParams.toString(), {
      headers: headerOptions
    })
      .pipe(map(res => {
        localStorage.setItem('access_token', res.access_token);
        this.user = res['data'];
        alert(res.access_token);
      }));
  }
}
