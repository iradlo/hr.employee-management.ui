import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AddTeamComponent } from "./team-add/team-add.component";
import { TeamMembersComponent } from "./team-members/team-members.component";
import { TeamsListComponent } from "./team-list/teams-list.component";

@NgModule({
  declarations: [
    TeamsListComponent,
    AddTeamComponent,
    TeamMembersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'teams', component: TeamsListComponent }
    ])
  ]
})
export class TeamModule { }