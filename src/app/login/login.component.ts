import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private user: User = new User();

  public errorMsg: string;
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
    public snackBar: MatSnackBar
  ) {}
  message: string;
  action = 'ok';

  ngOnInit() {
    this.f = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  urlSite() {
    localStorage.setItem('url', this.mainUrl);
  }
  login() {
    localStorage.setItem('url', this.mainUrl);
    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.authService.userAutenticate = true;
        this.authService.showNotLogin.emit(true);

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
