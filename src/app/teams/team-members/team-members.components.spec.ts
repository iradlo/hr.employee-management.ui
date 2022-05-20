import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TeamMembersComponent } from "./team-members.component"

describe('TeamMembersComponent', () => {
  let fixture: ComponentFixture<TeamMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMembersComponent],
    })

    fixture = TestBed.createComponent(TeamMembersComponent);
  })

  it('should have have correct member set', () => {
    fixture.componentInstance.teamMembers = ['aaa bb', 'ccc ddd'];
    expect(fixture.componentInstance.teamMembers[0]).toBe('aaa bb');
    expect(fixture.componentInstance.teamMembers[1]).toBe('ccc ddd');
  })
})