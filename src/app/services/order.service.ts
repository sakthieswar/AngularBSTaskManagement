import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order, OrderStatus } from '../entities/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private REST_API_SERVER = environment.baseUrl;
  order: Order;
  orders: Order[];
  orderstatus: OrderStatus[];

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  register(name: string, description: string, sku_id: string, assigned_to: string, order_no: string, inovice_no: string,
    platform: string, customer_name: string, customer_email: string, customer_contact_no: string, order_date: string, order_status: string) {
    const httpParams = new HttpParams().set('name', name).set('description', description).set('sku_id', sku_id)
      .set('assigned_to', assigned_to).set('order_no', order_no).set('inovice_no', inovice_no).set('platform', platform)
      .set('customer_name', customer_name).set('customer_email', customer_email).set('customer_contact_no', customer_contact_no).set('order_date', order_date).set('order_status', order_status);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.REST_API_SERVER + 'addneworder.php', httpParams.toString(), {
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

  public saveOrder(data) {
    let uploadURL = this.REST_API_SERVER + 'addneworder.php';
    return this.http.post<any>(uploadURL, data);
  }

  public getAllOrderList(): Observable<Order[]> {

    return this.http.get(this.REST_API_SERVER + 'getAllOrders.php').pipe(
      map((res) => {
        this.orders = res['data'];
        return this.orders;
      }),
      catchError(this.handleError));
  }

  public getAllOrderStatusList(): Observable<OrderStatus[]> {

    return this.http.get(this.REST_API_SERVER + 'getAllOrderStatus.php').pipe(
      map((res) => {
        this.orderstatus = res['data'];
        return this.orderstatus;
      }),
      catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
