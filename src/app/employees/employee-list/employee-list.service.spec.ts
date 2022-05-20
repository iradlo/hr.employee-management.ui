import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EmployeeListService } from "./employee-list.service";

describe('EmployeeListService', () => {
  let httpTestingController: HttpTestingController;
  let service: EmployeeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeListService]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EmployeeListService);
  })

  it('should call get all employees with correct URL', () => {
    service.getEmployeesHttp().subscribe();

    const req = httpTestingController.expectOne('https://localhost:44383/api/employee/all?includeteamData=false');
    req.flush([{ employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }]);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  })

  it('should call get employee details with correct URL', () => {
    service.getEmployeeDetails(1).subscribe();

    const req = httpTestingController.expectOne(`https://localhost:44383/api/employee/${1}`);
    req.flush([{ employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }]);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  })

  it('should call delete employee with correct URL', () => {
    service.deleteEmployee(1).subscribe();

    const req = httpTestingController.expectOne(`https://localhost:44383/api/employee/${1}`);
    req.flush([{ employeeId: 1, name: 'aaa', lastName: 'bbbb', address: "", city: "", email: "", phone: "", team: { description: "", teamId: 1, teamName: "" } }]);
    expect(req.request.method).toBe('DELETE');
    httpTestingController.verify();
  })
})