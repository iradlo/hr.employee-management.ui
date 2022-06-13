import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthgardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean |
    UrlTree |
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> {

    var isAuth = false;
    this.loginService.isAuthenticated.subscribe(a => { isAuth = a })

    if (!isAuth) {
      this.router.navigate(['/home']);
    }

    return isAuth;
  }
}