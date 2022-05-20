import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ITeam } from "../team";
import { AddTeamComponent } from "../team-add/team-add.component";
import { TeamListService } from "./teams-list.service";

@Component({
  templateUrl: './teams-list.component.html'
})
export class TeamsListComponent implements OnInit, OnDestroy {

  teamMembers: string[] = [];
  errorMessage: string = '';
  noDataMsg: string = '';
  teams: ITeam[] = [];
  showDetails: boolean = false;

  private selectedId: number = 0;
  private sub!: Subscription;

  constructor(private dialog: MatDialog, private teamsService: TeamListService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMembers(id: number): void {
    this.sub = this.teamsService.getTeamMembers(id).subscribe({
      next: e => {
        if (e.teamMembers !== undefined && e.teamMembers.length > 0) {
          this.teamMembers = e.teamMembers.map((i) => `${i.name} ${i.lastName}`);
          this.noDataMsg = '';

          return;
        }

        this.teamMembers = [];
        this.noDataMsg = 'No employees';
      },
      error: err => this.errorMessage = err
    });
  }

  btnClickShowDetails(id: number): void {
    if (this.selectedId !== id) {
      this.showDetails = true;
      this.selectedId = id;
      this.getMembers(id);

      return;
    }

    this.showDetails = !this.showDetails;
    this.selectedId = 0;
    this.noDataMsg = '';
  }

  getTeams(): void {
    this.sub = this.teamsService.getTeams().subscribe({
      next: t => this.teams = t,
      error: err => this.errorMessage = err
    });
  }

  btnAddTeam(): void {
    const dialogRef = this.dialog.open(AddTeamComponent);
    dialogRef.afterClosed().subscribe(() => this.getTeams());
  }

  btnClickDelete(id: number): void {
    if (confirm(`Are you sure to delete team ?`)) {
      this.teamsService.deleteTeam(id).subscribe({
        next: () => { this.getTeams() },
        error: err => this.errorMessage = err
      })
    }
  }
}