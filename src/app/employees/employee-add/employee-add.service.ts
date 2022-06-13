import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IEmployee } from "../employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeAddService {
  private employeeUrl: string = `${environment.serverAddress}/api/employee`;

  constructor(private http: HttpClient) { }

  addNewEmployee(employeeData: IEmployee): Observable<number> {
    console.log(employeeData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<number>(this.employeeUrl, employeeData, { headers })
      .pipe(
        tap(data => console.log('addNewEmployee: ' + data)),
        catchError(this.handleError));
  }

  updateEmployee(employeeData: IEmployee): Observable<IEmployee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<IEmployee>(this.employeeUrl, employeeData, { headers })
      .pipe(
        tap(data => console.log('updated employee: ' + JSON.stringify(data))),
        catchError(this.handleError));
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