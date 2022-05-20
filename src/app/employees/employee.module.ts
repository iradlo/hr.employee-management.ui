import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AddEmployeeComponent } from "./employee-add/employee-add.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      { path: 'employees', component: EmployeeListComponent }
    ])
  ]
})
export class EmployeeModule { }