import { Component, Inject, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ITeam } from "../../teams/team";
import { TeamListService } from "../../teams/team-list/teams-list.service";
import { EmployeeAddService } from "./employee-add.service";
import { IEmployee } from "../employee";

@Component({
  selector: 'hw-add-employee',
  templateUrl: './employee-add.component.html'
})

export class AddEmployeeComponent implements OnInit {

  employeeAddHeader: string = '';
  teams: ITeam[] = [];
  employeeGroupForm!: FormGroup;
  errorMessage: string = '';

  private selectedTeamId: number = 0;

  constructor(private fb: FormBuilder,
    private employeeAddService: EmployeeAddService,
    private teamService: TeamListService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IEmployee
  ) {
    if (data != null) {
      this.selectedTeamId = data?.team.teamId;
    }
  }

  ngOnInit(): void {

    this.teamService.getTeams().subscribe({
      next: t => this.teams = t,
      error: err => this.errorMessage = err
    });

    this.employeeGroupForm = this.fb.group({
      name: [this.data !== null ? this.data.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: [this.data !== null ? this.data.lastName : '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      teamName: [this.data != null ? this.data.team.teamId : '', [Validators.required]],
      address: [this.data !== null ? this.data.address : ''],
      city: [this.data !== null ? this.data.city : ''],
      phone: [this.data !== null ? this.data.phone : ''],
      email: [this.data !== null ? this.data.email : '']
    })

    if (this.data != null) {
      this.employeeAddHeader = 'Edit employee';
    } else {
      this.employeeAddHeader = 'Add employee';
    }
  }

  saveEmployee(): void {
    if (this.employeeGroupForm.dirty) {
      var employeeData: IEmployee = this.employeeGroupForm.value;

      employeeData.team = {
        teamId: this.selectedTeamId,
        description: '',
        teamName: ''
      }

      if (this.data === null) {
        this.employeeAddService.addNewEmployee(employeeData).subscribe({
          next: x => { this.employeeGroupForm.reset(); this.dialogRef.close(); },
          error: err => this.errorMessage = err
        });
      }
      else {
        employeeData.employeeId = this.data.employeeId;
        this.employeeAddService.updateEmployee(employeeData).subscribe({
          next: x => { this.dialogRef.close(); },
          error: err => this.errorMessage = err
        });
      }
    }
  }

  selectedTeamChange(event: any): void {
    this.selectedTeamId = event.target.value;
  }

  bntCancel(): void {
    this.dialogRef.close();
  }
}