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

  isAddEditForm: boolean = false;
  isNewForm: boolean = true;
  uploadResponse;
  isAdminRole: boolean = false;
  user_id: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    let loginrole = JSON.parse(localStorage.getItem('role'));
    if (user == null) {
      this.router.navigateByUrl('home');
    }
    else {
      this.isAddEditForm = false;
      this.user_id = user;
      this.getAllUsers();
      this.generateFormControls();
      if (loginrole == 1) {
        this.isAdminRole = true;
      }      
    }

  }

  generateFormControls() {
    this.registerForm = this.formBuilder.group({
      index: [{ value: null, disabled: true }],
      user_id: [{ value: null, disabled: true }],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      cpassword: [null, Validators.required],
      contactno: [null]
    }, { validator: this.checkPasswords });
  }




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

  showAddWindow() {
    this.isAddEditForm = true;
    this.resetForm();
    this.isNewForm = true;
  }
  resetForm() {
    this.registerForm.reset();
  }
  showUserListWindow() {
    this.isAddEditForm = false;
  }

  get r() { return this.registerForm.controls; }
  onSave() {
    this.authenticationService.register(this.r.username.value, this.r.email.value, this.r.password.value, this.r.contactno.value, '1', '1', 'test')
      .pipe(first())
      .subscribe(
        data => {
          //alert('test');
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

  SaveUser() {
    const formData = new FormData();

    let index = this.registerForm.getRawValue().index;
    //alert(index);

    formData.append('username', this.registerForm.get('username').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('contactno', this.registerForm.get('contactno').value);
    formData.append('isactive', "1");
    formData.append('created_by', this.user);
    formData.append('created_date', "");

    if (index != null) {
      //alert(' task id: ' + this.registerForm.get('task_id').value);
      formData.append('user_id', this.registerForm.get('user_id').value);

      this.authenticationService.updateUser(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            alert('You have successfully updated the user: ' + this.registerForm.get('username').value);
            //this.router.navigate(['/user']);
            window.location.reload();
            //this.hideModals();
            //console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );      
    }

    else {
      

      this.authenticationService.saveUser(formData)
        .subscribe(
          (res) => {
            this.uploadResponse = res;
            alert('You have successfully added the user: ' + this.registerForm.get('username').value);
            //this.router.navigate(['/user']);
            window.location.reload();
            //this.hideModals();
            //console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      
    }
  }

  userEdit(user) {
    //alert(task.decription);
    //$("#taskModal").modal('show');
    this.isAddEditForm = true;
    this.isNewForm = false;
    //document.getElementById('taskModal').show();
    //document.getElementById('').

    //this.assignedToUserId = task.assignedto;

    this.registerForm.setValue({
      index: user.user_id,
      user_id: user.user_id,
      email: user.user_email,
      contactno: user.contact_no,
      username: user.user_name,
      password: [null],
      cpassword: [null]
    })
    //this.assignedToUserId = "2";
    //this.registerForm.controls.taskpriorities.patchValue(this.taskpriorities[0].id);
  }

  //This is for search.
  name: any;
  searchUser() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.users = this.users.filter(res => {
        return res.user_name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  //This is for sorting.
  key: string = "task_id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}

