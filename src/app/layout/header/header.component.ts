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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logoff() {
    let user = JSON.parse(localStorage.getItem('user'));
    alert('Before log off ' + user);
    localStorage.removeItem("user");
    alert('After log off ' + user);
    this.router.navigateByUrl('home');
    
  }
}
