import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IEmployee } from "../employee";
import { MatDialog } from "@angular/material/dialog";
import { AddEmployeeComponent } from "../employee-add/employee-add.component";
import { EmployeeListService } from "./employee-list.service";

@Component({
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  showDetails: boolean = false;
  pageTitle: string = 'Employees';
  employees: IEmployee[] = [];
  errorMessage: string = '';
  selectedEmployee!: IEmployee;
  dataIsLoaded: boolean = false;

  private selectedId: number = 0;
  private sub!: Subscription;

  constructor(private dialog: MatDialog, private employeeListService: EmployeeListService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getEmployees() {
    this.sub = this.employeeListService.getEmployeesHttp().subscribe({
      next: e => this.employees = e,
      error: err => this.errorMessage = err
    });
  }


  btnClickShowDetails(id: number): void {
    if (this.selectedId !== id) {
      this.showDetails = true;
      this.selectedId = id;

      console.log('Getting data for employee id = ' + id);
      this.getSelectedEmployee(id);

      return;
    }

    this.showDetails = !this.showDetails;
    this.selectedId = 0;
    this.dataIsLoaded = false;
  }

  btnClickDelete(id: number): void {
    if (!confirm(`Are you sure to delete employee ?`)) {
      return;
    }
    this.employeeListService.deleteEmployee(id).subscribe({
      next: () => { this.getEmployees(), this.showDetails = false },
      error: err => this.errorMessage = err
    })
  }

  btnAddEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe(() => this.getEmployees());
  }

  onUpdated(): void {
    this.getEmployees();
    this.getSelectedEmployee(this.selectedId);
  }

  private getSelectedEmployee(id: number): void {
    this.sub = this.employeeListService.getEmployeeDetails(id).subscribe({
      next: e => { this.selectedEmployee = e, this.dataIsLoaded = true },
      error: err => this.errorMessage = err
    });
  }
}