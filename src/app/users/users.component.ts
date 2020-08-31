import { Component, OnInit } from '@angular/core';
import { WpApiUsers } from 'wp-api-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private wpApiUsers: WpApiUsers) {
    this.getUserList();
  }

  ngOnInit() {}
  getUserList() {
    this.wpApiUsers
      .getList()
      .toPromise()
      .then((response) => {
        const json = response.json();
        this.users = json;
      });
  }
}
