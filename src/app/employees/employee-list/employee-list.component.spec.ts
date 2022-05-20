import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { EmployeeListComponent } from "./employee-list.component";
import { EmployeeListService } from "./employee-list.service";
import { IEmployee } from "../employee";
import { By } from "@angular/platform-browser";
import { EmployeeDetailsComponent } from "../employee-details/employee-details.component";

describe('EmployeeListComponent', () => {
  let mockEmployeeService: jasmine.SpyObj<EmployeeListService>;
  let mockMatDialog: MatDialog;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let EMPLOYEES: IEmployee[] = [];

  beforeEach(() => {
    EMPLOYEES = [
      { employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }
    ];

    mockEmployeeService = jasmine.createSpyObj<EmployeeListService>(['getEmployeesHttp', 'deleteEmployee', 'getEmployeeDetails']);
    mockMatDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: EmployeeListService, useValue: mockEmployeeService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(EmployeeListComponent);
  })

  it('should get employees from the service', () => {
    mockEmployeeService.getEmployeesHttp.and.returnValue(of(EMPLOYEES));
    fixture.detectChanges();
    expect(fixture.componentInstance.employees.length).toBe(1);
    expect(mockEmployeeService.getEmployeesHttp).toHaveBeenCalled();
  })

  xit('should call delete on service', () => {
    fixture.componentInstance.employees = EMPLOYEES;
    mockEmployeeService.deleteEmployee.and.returnValue(of(true));

    fixture.componentInstance.btnClickDelete(1);

    expect(mockEmployeeService.deleteEmployee).toHaveBeenCalled();
  })

  it('should call get details on service', () => {
    fixture.componentInstance.employees = EMPLOYEES;
    mockEmployeeService.getEmployeeDetails.and.returnValue(of(EMPLOYEES[0]));

    fixture.componentInstance.btnClickShowDetails(1);

    expect(mockEmployeeService.getEmployeeDetails).toHaveBeenCalled();
  })

  it('should create one tr for each employee (include header)', () => {
    mockEmployeeService.getEmployeesHttp.and.returnValue(of(EMPLOYEES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(2);
  })

  it('should render employee name and last name correctly', () => {
    fixture.componentInstance.employees = EMPLOYEES;
    mockEmployeeService.getEmployeesHttp.and.returnValue(of(EMPLOYEES))
    fixture.detectChanges();

    let debugEl = fixture.debugElement.queryAll(By.css('td'));
    expect(debugEl[0].nativeElement.textContent).toContain('aaa');
    expect(debugEl[1].nativeElement.textContent).toContain('bbb');
  })

  it('should render employee details component', () => {
    fixture.componentInstance.employees = EMPLOYEES;
    mockEmployeeService.getEmployeesHttp.and.returnValue(of(EMPLOYEES));
    mockEmployeeService.getEmployeeDetails.and.returnValue(of(EMPLOYEES[0]));

    fixture.detectChanges();

    fixture.componentInstance.btnClickShowDetails(1);


    expect(fixture.componentInstance.selectedEmployee).toBe(EMPLOYEES[0]);

    // const detailsDE = fixture.debugElement.query(By.directive(EmployeeDetailsComponent));
    // expect(detailsDE.nativeElement.employeeData).toBe(EMPLOYEES[0]);
  })
})