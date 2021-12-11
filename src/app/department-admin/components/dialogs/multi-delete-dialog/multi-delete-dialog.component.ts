import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocsModel } from 'src/app/department-admin/models/docsModel';
@Component({
  selector: 'app-multi-delete-dialog',
  templateUrl: './multi-delete-dialog.component.html',
  styleUrls: ['./multi-delete-dialog.component.scss']
})
export class MultiDeleteDialogComponent implements OnInit {

  public docsSets: Array<DocsModel> = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<MultiDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.docsSets = data.docs;
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.array([])
    });
    console.log(this.docsSets);
    
  }

  onChangeEventFunc(name: string, isChecked: MatCheckboxChange) {
    const cartoons = (this.form.controls.name as FormArray);
    if (isChecked.checked) {
      cartoons.push(new FormControl(name));
    } else {
      const index = cartoons.controls.findIndex(x => x.value === name);
      cartoons.removeAt(index);
    }
  }

  submit() {
    console.log(this.form.value.name);
  }
  
}
