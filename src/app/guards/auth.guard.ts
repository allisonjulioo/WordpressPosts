import { PostPageComponent } from './../post-page/post-page.component';
import { AuthService } from './../nav-header/services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router : Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{

    if(this.auth.check()){
      this.auth.userAutenticate = true;
      this.auth.showNotLogin.emit(true);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
