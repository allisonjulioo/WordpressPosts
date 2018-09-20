import { AuthService } from './../nav-header/services/auth.service';
import { User } from './user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: User = new User();

  favoriteSeason: string = "http";
  public errorMsg: string = '';
  seasons: string[] = ['http', 'https'];
  mainUrl: '';

  @Input() token;
  @Output() tokenChange = new EventEmitter<string>();


  f: FormGroup;
  errorCredentials = false;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar,) { }
    message: string = ''
    action: string = 'ok'

  ngOnInit() {
    this.f = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  urlSite(){
    localStorage.setItem('url', this.mainUrl);
  }
  login() {
    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.authService.userAutenticate = true;
        this.authService.showNotLogin.emit(true);
        //this.router.navigate(['/post-page']);

        this.snackBar.open('Bem vindo!', this.action, {
         duration: 2000,
         });

      },
      (errorResponse: HttpErrorResponse) => {
        this.authService.userAutenticate = false;
        this.authService.showNotLogin.emit(false);

        this.snackBar.open('login ou senha incorretos', this.action, {
          duration: 2000,
        });
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );

  }

} 
