import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ITeam } from "../team";

@Injectable({
  providedIn: 'root'
})
export class TeamAddService {
  private teamsUrl: string = `${environment.serverAddress}/api/team`;

  constructor(private http: HttpClient) { }

  addTeam(newTeam: ITeam): Observable<ITeam> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ITeam>(this.teamsUrl, newTeam, { headers })
      .pipe(
        tap(team => console.log('new team: ' + JSON.stringify(team))),
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