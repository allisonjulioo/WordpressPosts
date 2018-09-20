import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token = null;
  showMenus: boolean = false;

  constructor(private authService: AuthService) {
    
  }
  ngOnInit(){
    this.authService.showNotLogin.subscribe(
      showMenus => this.showMenus = showMenus
    );{}
  }
}
