import { AuthService } from './services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  user = {
    login: '',
    password: ''
  }
  @Input() token;
  @Output() tokenChange = new EventEmitter<string>();
  title: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(  private breakpointObserver: BreakpointObserver, 
                private route: ActivatedRoute, 
                router: Router, 
                private http: HttpClient,
                private authService : AuthService) {


    router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {
        if (event.url === '/post-edit') {
          this.title = 'Editar post'
        }
        else if (event.url === '/third-page') {
          this.title = 'Relatório Analytcs'
        }
        else if (event.url === '/posts-page') {
          this.title = 'Todos os posts'
        }

      });
  }

  ngOnInit(){}

  logout(){
    this.authService.logout();
    this.authService.userAutenticate = false;
    this.authService.showNotLogin.emit(false);
  }

}
