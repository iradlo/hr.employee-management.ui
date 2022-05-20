import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IEmployee } from "../employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeAddService {
  private employeeUrl: string = "https://localhost:44383/api/employee";

  constructor(private http: HttpClient) { }

  addNewEmployee(employeeData: IEmployee): Observable<IEmployee> {
    console.log(employeeData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<IEmployee>(this.employeeUrl, employeeData, { headers })
      .pipe(
        tap(data => console.log('addNewEmployee: ' + JSON.stringify(data))),
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