import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog"
import { of } from "rxjs";
import { ITeam } from "../team";
import { TeamsListComponent } from "./teams-list.component"
import { TeamListService } from "./teams-list.service";
import { ITeamDetails } from "../team-details";
import { By } from "@angular/platform-browser";

describe('TeamsListComponent', () => {
  let mockMatDialog: MatDialog;
  let mockTeamService: jasmine.SpyObj<TeamListService>;
  let fixture: ComponentFixture<TeamsListComponent>;
  let TEAMS: ITeam[] = [];
  let TEAM_DETAILS: ITeamDetails;

  beforeEach(() => {
    TEAMS = [
      { teamId: 1, teamName: 'test', description: 'testing' }
    ]

    TEAM_DETAILS = { teamId: 1, teamName: 'test', description: 'testing', teamMembers: [{ name: 'Igor', lastName: 'Radlovacki' }] };

    mockMatDialog = jasmine.createSpyObj(['open']);
    mockTeamService = jasmine.createSpyObj<TeamListService>(['getTeamMembers', 'getTeams', 'deleteTeam']);

    TestBed.configureTestingModule({
      declarations: [
        TeamsListComponent
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: TeamListService, useValue: mockTeamService }
      ]
    })

    fixture = TestBed.createComponent(TeamsListComponent);
  })

  it('should get teams from the service', () => {
    mockTeamService.getTeams.and.returnValue(of(TEAMS));
    fixture.detectChanges();
    expect(fixture.componentInstance.teams.length).toBe(1);
    expect(mockTeamService.getTeams).toHaveBeenCalled();
  })

  it('should call get team details on service', () => {
    fixture.componentInstance.teams = TEAMS;
    mockTeamService.getTeamMembers.and.returnValue(of(TEAM_DETAILS));

    fixture.componentInstance.btnClickShowDetails(1);

    expect(mockTeamService.getTeamMembers).toHaveBeenCalled();
  })

  it('should create one tr for each team (include header)', () => {
    mockTeamService.getTeams.and.returnValue(of(TEAMS));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(2);
  })

  it('should render team name correctly', () => {
    fixture.componentInstance.teams = TEAMS;
    mockTeamService.getTeams.and.returnValue(of(TEAMS))
    fixture.detectChanges();

    let debugEl = fixture.debugElement.queryAll(By.css('td'));
    expect(debugEl[0].nativeElement.textContent).toContain('test');
    expect(debugEl[1].nativeElement.textContent).toContain('testing');
  })
})