import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddEmployeeComponent } from "../employee-add/employee-add.component";
import { IEmployee } from "../employee";

@Component({
  selector: 'hw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent {
  @Input() employeeData!: IEmployee;
  @Output() dataUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  btnClickEdit(id: number): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: this.employeeData
    });
    dialogRef.afterClosed().subscribe(() => this.dataUpdated.emit());
  }
}