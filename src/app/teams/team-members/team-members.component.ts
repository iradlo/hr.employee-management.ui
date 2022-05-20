import { Component, Input } from "@angular/core";

@Component({
  selector: 'hw-team-members',
  templateUrl: './team-members.component.html'
})

export class TeamMembersComponent {
  @Input() noDataMsg: string = '';
  @Input() teamMembers: string[] = [];
}