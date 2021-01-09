import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-orderregister',
  templateUrl: './orderregister.component.html',
  styleUrls: ['./orderregister.component.css']
})
export class OrderregisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
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

  get r() { return this.registerForm.controls; }

  onSave() {
    this.orderService.register(this.r.name.value, this.r.description.value, this.r.sku_id.value, this.r.assigned_to.value, this.r.order_no.value, this.r.inovice_no.value, this.r.platform.value, this.r.customer_name.value, this.r.customer_email.value, this.r.customer_contact_no.value, this.r.order_date.value, this.r.order_status.value)
      .pipe(first())
      .subscribe(
        data => {
          //alert('test');
          this.hideModalorder();
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

  hideModalorder(): void {
    document.getElementById('orderModal').click();
  }

}
