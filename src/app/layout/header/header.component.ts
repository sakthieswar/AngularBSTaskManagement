import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogin: boolean = false;
  public loggedInUserName: string = "";

  passwordChangeForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let username = localStorage.getItem('username');
    if (user != null) {
      this.isLogin = true;
      this.loggedInUserName = username;
      this.generateFormControls();
    }
  }

  generateFormControls() {
    this.passwordChangeForm = this.formBuilder.group({
      //index: [{ value: null, disabled: true }],
      user_id: [{ value: null, disabled: true }],
      password: [null, Validators.required],
      cpassword: [null, Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  logoff() {
    let user = JSON.parse(localStorage.getItem('user'));
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    this.router.navigateByUrl('home');
  }

  ChangeUserPassword() {
    const formData = new FormData();
    //alert(index);

    formData.append('user_id', localStorage.getItem('user'));
    formData.append('password', this.passwordChangeForm.get('password').value);
  }

  get p() { return this.passwordChangeForm.controls; }
  hideCPModal(): void {
    document.getElementById('mdlChangepassword').click();
  }
}
