import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IEmployee } from "../employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {
  private employeeUrl: string = `${environment.serverAddress}/api/employee`;

  constructor(private http: HttpClient) { }

  getEmployeesHttp(): Observable<IEmployee[]> {
    const url = `${this.employeeUrl}/all?includeteamData=false`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IEmployee[]>(url, { headers }).pipe(
      tap(data => console.log('Data', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getEmployeeDetails(id: number): Observable<IEmployee> {
    const url = `${this.employeeUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<IEmployee>(url, { headers }).pipe(
      tap(data => console.log('Data', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete<IEmployee>(url, { headers })
      .pipe(
        tap(data => console.log('deleteEmployee: ' + id)),
        catchError(this.handleError)
      );
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