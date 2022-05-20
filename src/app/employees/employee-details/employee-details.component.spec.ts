import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog";
import { EmployeeDetailsComponent } from "./employee-details.component"

describe('EmployeeDetailsComponent', () => {
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let mockMatDialog: MatDialog;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    })

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
  });

  it('should have correct employee set', () => {
    fixture.componentInstance.employeeData = { employeeId: 1, name: 'igor', lastName: 'radlovacki', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } };
    expect(fixture.componentInstance.employeeData.lastName).toEqual('radlovacki');
  })
})