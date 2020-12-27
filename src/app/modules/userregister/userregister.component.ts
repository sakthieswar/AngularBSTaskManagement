import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      cpassword: [null, Validators.required],
      contactno: [null]
    }, { validator: this.checkPasswords });
  }
  get r() { return this.registerForm.controls; }
  onSave() {
    this.authenticationService.register(this.r.username.value, this.r.email.value, this.r.password.value, this.r.contactno.value, '1', '1', 'test')
      .pipe(first())
      .subscribe(
        data => {
          alert('test');
          //this.router.navigate(['/home']);
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

  //To verify password & confirm password are same.
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  hideModal(): void {
    document.getElementById('close-modal').click();
  }
}
