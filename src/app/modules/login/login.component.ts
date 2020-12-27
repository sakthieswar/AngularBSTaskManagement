import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isvaliduser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    this.isvaliduser = true;
    this.loginForm = this.formBuilder.group({
      useremail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get l() { return this.loginForm.controls; }

  onSave() {
    //this.router.navigateByUrl('admin');
    this.authenticationService.login(this.l.useremail.value, this.l.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate(['/user']);
          this.isvaliduser = true;
          this.router.navigateByUrl('admin');

          //console.log(data);
          //this.loading = false;
          //this.hideModal();
          //this.alertService.success("Successfully login");
          alert(data);
          //  this.router.navigate([this.returnUrl]);
        },
        error => {
          alert(error);
          //this.alertService.error(error);
          //this.loading = false;
        });
  }

}
