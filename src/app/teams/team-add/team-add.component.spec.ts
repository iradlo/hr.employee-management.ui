import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { ITeam } from "../team";
import { AddTeamComponent } from "./team-add.component"
import { TeamAddService } from "./team-add.service";

describe('AddTeamComponent', () => {
  let mockTeamService: jasmine.SpyObj<TeamAddService>;
  let mockMatDialogRef;
  let mockFormBuilder;
  let fixture: ComponentFixture<AddTeamComponent>;

  beforeEach(() => {

    mockFormBuilder = jasmine.createSpyObj<FormBuilder>(['group']);
    mockMatDialogRef = jasmine.createSpyObj<MatDialogRef<AddTeamComponent>>(['close'])
    mockTeamService = jasmine.createSpyObj<TeamAddService>(['addTeam']);

    TestBed.configureTestingModule({
      declarations: [AddTeamComponent],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: TeamAddService, useValue: mockTeamService }
      ]
    })

    fixture = TestBed.createComponent(AddTeamComponent);
  })

  xit('should call add team on service', () => {
    fixture.componentInstance.saveTeam();
    expect(mockTeamService.addTeam).toHaveBeenCalled();
  })

  // it('should add new team when button save is clicked', () => {

  //   const newTeam = { teamId: 1, teamName: 'test', description: 'adasda' };
  //   mockTeamService.addTeam.and.returnValue(of(newTeam));
  //   const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  //   console.log(inputEl);
  //   const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
  //   inputEl.value = 'test';
  //   addButton.triggerEventHandler('click', null);

  //   fixture.detectChanges();

  // })
})