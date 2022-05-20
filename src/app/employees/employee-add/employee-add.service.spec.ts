import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EmployeeAddService } from "./employee-add.service";
import { IEmployee } from "../employee";

describe('EmployeeAddService', () => {
  let httpTestingController: HttpTestingController;
  let service: EmployeeAddService;
  let EMPLOYEES: IEmployee[] = [];

  beforeEach(() => {
    EMPLOYEES = [
      { employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }
    ];

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeAddService]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmployeeAddService);
  })

  it('should call add new employee with correct URL', () => {
    service.addNewEmployee(EMPLOYEES[0]).subscribe();

    const req = httpTestingController.expectOne('https://localhost:44383/api/employee');
    //req.flush([{ employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }]);
    expect(req.request.method).toBe('POST');
    httpTestingController.verify();
  })

  it('should call update employee with correct URL', () => {
    service.updateEmployee(EMPLOYEES[0]).subscribe();

    const req = httpTestingController.expectOne('https://localhost:44383/api/employee');
    //req.flush([{ employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }]);
    expect(req.request.method).toBe('PUT');
    httpTestingController.verify();
  })
})