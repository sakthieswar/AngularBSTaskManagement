import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  userRole: string;
  adminRole: boolean = false;

  constructor() { }

  ngOnInit(): void {
    let adminRole = JSON.parse(localStorage.getItem('user'));
    if (adminRole == 1) {
      this.adminRole = false;
    }
  }

}
