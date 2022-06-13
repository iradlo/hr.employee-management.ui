import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ILoginData } from "./login-data";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }


  signUp(loginData: ILoginData): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<number>(`${environment.serverAddress}/api/users/register`, { ...loginData, role: 'user' }, { headers })
      .pipe(
        tap(u => console.log('New user created with id=', u)),
        catchError(this.handleError))
  }

  signIn(loginData: ILoginData): Observable<ILoginData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ILoginData>(`${environment.serverAddress}/api/users/login`, loginData, { headers })
      .pipe(
        tap(resData => this.handleAuth(resData.username, resData.password, resData.role, resData.token, resData.message)),
        catchError(this.handleError))
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.isAuthenticated.next(false);

    this.router.navigate(['/home']);
  }

  handleAuth(username: string, password: string, role: string, token: string, msg: string) {

    if (!token || !username || !role) {
      this.isAuthenticated.next(false);
      this.router.navigate(['/home']);
    } else {
      this.isAuthenticated.next(true);
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', username);
      localStorage.setItem('role', role);
      this.router.navigate(['/employees']);
    }
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}