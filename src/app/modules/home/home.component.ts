import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup 
  isvaliduser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    //this.isvaliduser = false;

    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      this.isvaliduser = false;
    }
    else {
      this.isvaliduser = true;
    }

    this.loginForm = this.formBuilder.group({
      useremail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get l() { return this.loginForm.controls; }

  onSave() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.l.useremail.value, this.l.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isvaliduser = true;
          window.location.reload();
        },
        error => {
          alert('Username or password is incorrect.');
        });
  }

}
