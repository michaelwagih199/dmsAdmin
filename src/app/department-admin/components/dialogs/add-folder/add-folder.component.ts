import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {

  description: string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddFolderComponent>,
      @Inject(MAT_DIALOG_DATA) data: any) {
      this.description = data.description;
  }

  ngOnInit() {
      this.validateForm = this.fb.group({
        name: [this.description, [Validators.required]],
      });
  }

  save() {
      this.dialogRef.close(this.validateForm.value);
  }

  validateForm!: FormGroup;
  submitForm(): void {
   
  }
      
  close() {
      this.dialogRef.close();
  }

  
}
