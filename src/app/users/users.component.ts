import { Component, OnInit, Input } from '@angular/core';
import { WpApiUsers } from 'wp-api-angular';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor( private wpApiUsers: WpApiUsers) {
    this.getUserList();
   }

  ngOnInit() {
  }
  getUserList() {   
    this.wpApiUsers.getList()
    .toPromise()
    .then( response => {
      let json: any = response.json();
      this.users = json;
      console.log(this.users)
    })
  }
}
