import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import { map } from 'rxjs/operators';
import { User } from '../login/user';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  public user: User;
  @Input() token: string;
  @Output() tokenChange = new EventEmitter<string>();
  title: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    public breakpointObserver: BreakpointObserver,
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public authService: AuthService
  ) {
    router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((event) => {
        if (event.url === '/post-edit') {
          this.title = 'Novo post';
        } else if (event.url === '/third-page') {
          this.title = 'Relatório Analytcs';
        } else if (event.url === '/posts-page') {
          this.title = 'Todos os posts';
        } else {
          this.title = 'Todos os posts';
        }
      });
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.authService.userAutenticate = false;
    this.authService.showNotLogin.emit(false);
  }
}
