import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './home/login/login.service';

@Component({
  selector: 'hw-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
  pageTitle = 'HR Employee management';
  private sub: Subscription | undefined;
  isAuth: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.sub = this.loginService.isAuthenticated.subscribe(a => {
      this.isAuth = a;
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
