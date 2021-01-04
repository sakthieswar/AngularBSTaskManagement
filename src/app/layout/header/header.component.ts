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

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.isLogin = true;
    }
  }
  logoff() {
    let user = JSON.parse(localStorage.getItem('user'));
    localStorage.removeItem("user");
    this.router.navigateByUrl('home');
    
  }
}
