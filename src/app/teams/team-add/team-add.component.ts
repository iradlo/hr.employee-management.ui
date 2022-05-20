import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TeamAddService } from "./team-add.service";

@Component({
  templateUrl: './team-add.component.html'
})

export class AddTeamComponent implements OnInit {

  teamGroupForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddTeamComponent>, private teamAddService: TeamAddService,) { }

  ngOnInit(): void {
    this.teamGroupForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(150)]]
    })
  }

  saveTeam(): void {
    if (this.teamGroupForm.dirty) {
      this.teamAddService.addTeam(this.teamGroupForm.value).subscribe({
        next: x => { this.teamGroupForm.reset(); this.dialogRef.close(); },
        error: err => this.errorMessage = err
      });
    }
  }

  btnCancel(): void {
    this.dialogRef.close();
  }
}