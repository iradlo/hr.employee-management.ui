import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { ITeam } from "../team";
import { ITeamDetails } from "../team-details";

@Injectable({
  providedIn: 'root'
})
export class TeamListService {
  private teamsUrl: string = "https://localhost:44383/api/team";

  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.teamsUrl}/all`;
    return this.http.get<ITeam[]>(url, { headers })
      .pipe(
        tap(data => console.log('Data ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getTeamMembers(teamId: number): Observable<ITeamDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.teamsUrl}/${teamId}`;
    return this.http.get<ITeamDetails>(url, { headers })
      .pipe(
        tap(data => console.log('Data ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteTeam(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.teamsUrl}/${id}`;
    return this.http.delete<ITeam>(url, { headers })
      .pipe(
        tap(data => console.log('deleteTeam: ' + id)),
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