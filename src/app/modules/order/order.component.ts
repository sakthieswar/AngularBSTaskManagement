import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Order } from '../../entities/order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskPriority } from '../../entities/task_priority';
import { User } from '../../entities/user';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];
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

  selectedAssigneeID: number;
  selectedTaskPriorityID: number;
  selectedTaskStatusID: number;

  isAdminRole: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let loginrole = JSON.parse(localStorage.getItem('role'));
    if (user == null) {
      this.router.navigateByUrl('home');
    } else {
      this.getAllOrders();
      this.generateFormControls();
    }
  }

  generateFormControls() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      sku_id: [null],
      assigned_to: [null],
      order_no: [null],
      inovice_no: [null],
      platform: [null],
      customer_name: [null],
      customer_email: [null],
      customer_contact_no: [null],
      order_date: [null],
      order_status: [null]
    });
  }

  getAllOrders(): void {
    this.orderService.getAllOrderList().subscribe(
      (res: Order[]) => {
        this.orders = res;
      },
      (err) => {
        this.error = err;
      }
    )
  }

  showAddWindow() {
    this.isAddEditForm = true;
    this.resetForm();
  }
  showTaskListWindow() {
    this.isAddEditForm = false;
  }
  resetForm() {
    this.registerForm.reset();
  }

  //This is for search.
  name: any;
  searchOrder() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.orders = this.orders.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  //This is for sorting.
  key: string = "name";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onSave() {
    this.orderService.register(this.r.name.value, this.r.description.value, this.r.sku_id.value,
      this.r.assigned_to.value, this.r.order_no.value, this.r.inovice_no.value, this.r.platform.value,
      this.r.customer_name.value, this.r.customer_email.value, this.r.customer_contact_no.value,
      this.r.order_date.value, this.r.order_status.value)
      .pipe(first())
      .subscribe(
        data => {
         
        },
        error => {
        });
  }
  get r() { return this.registerForm.controls; }
  saveOrder() {
    const formData = new FormData();

    let index = this.registerForm.getRawValue().index;
    //alert(this.todayDate);

    formData.append('name', this.registerForm.get('name').value);
    formData.append('description', this.registerForm.get('description').value);
    formData.append('sku_id', this.registerForm.get('sku_id').value);
    formData.append('assigned_to', this.registerForm.get('assigned_to').value);
    formData.append('order_no', this.registerForm.get('order_no').value);
    formData.append('inovice_no', this.registerForm.get('inovice_no').value);
    formData.append('platform', this.registerForm.get('platform').value);
    formData.append('customer_name', this.registerForm.get('customer_name').value);
    formData.append('customer_email', this.registerForm.get('customer_email').value);
    formData.append('customer_contact_no', this.registerForm.get('customer_contact_no').value);
    formData.append('order_date', this.registerForm.get('order_date').value);
    formData.append('order_status', this.registerForm.get('order_status').value);

    if (index != null) {
      //alert(' task id: ' + this.registerForm.get('task_id').value);
      //formData.append('task_id', this.registerForm.get('task_id').value);

      //this.taskService.updateTask(formData)
      //  .subscribe(
      //    (res) => {
      //      this.uploadResponse = res;
      //      alert('You have successfully updated the task: ' + this.registerForm.get('name').value);
      //      this.router.navigate(['/task']);
      //      //this.hideModals();
      //      //console.log(res);
      //    },
      //    (err) => {
      //      console.log(err);
      //    }
      //  );
    }

    else {

      this.orderService.saveOrder(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            alert('You have successfully added order: ' + this.registerForm.get('name').value);
            this.router.navigate(['/order']);
            //this.hideModals();
            //console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

}
