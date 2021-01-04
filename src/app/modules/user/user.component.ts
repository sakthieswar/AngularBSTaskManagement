import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../../entities/user';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registerForm: FormGroup;
  users: User[];
  public error;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null) {
      this.router.navigateByUrl('home');
    }
    else {
      this.getAllUsers();
    }
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      cpassword: [null, Validators.required]
      , fname: [null],
      lname: [null],
      contactno: [null]
    }, { validator: this.checkPasswords });
}
//onSave() {
//  this.authenticationService.register('test','test@email.com','test123','12345','1','1','test')
//    .pipe(first())
//    .subscribe(
//      data => {
//        alert('test');
//        //this.router.navigate(['/home']);
//        //console.log(data);
//        //this.loading = false;
//        //this.hideModal();
//        //this.alertService.success("Successfully login");
//        //alert(data);
//        //  this.router.navigate([this.returnUrl]);
//      },
//      error => {
//        alert(error);
//        //this.alertService.error(error);
//        //this.loading = false;
//      });
//}

  //To verify password & confirm password are same.
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  showModal(): void {
    //$("#myModal").modal('show');
  }

  getAllUsers(): void {
    this.authenticationService.getAllUsersList().subscribe(
      (res: User[]) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => {
        this.error = err;
      }
    )
  }

}

