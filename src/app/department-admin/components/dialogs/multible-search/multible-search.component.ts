import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DocsService } from '../../../services/docs.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-multible-search',
  templateUrl: './multible-search.component.html',
  styleUrls: ['./multible-search.component.scss']
})
export class MultibleSearchComponent implements OnInit {
  
  titleControl = new FormControl();
  ownerControl = new FormControl();
  titleValue: any;
  ownerValue: any;
  filteredTitleOptions!: Observable<string[]>;
  filteredOwnerOptions!: Observable<string[]>;
  isLoading: boolean = false;
  titleOptions!: string[];
  ownerOptions!: string[];
  parentId: string;

  constructor(
    private dialogRef: MatDialogRef<MultibleSearchComponent>,
    private docsService: DocsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.parentId = data.parentId;
  }

  private _filterTitles(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titleOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterOwners(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ownerOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /**event */
  search() {
    let data = {
      title: this.titleValue,
      owner: this.ownerValue,
    };
    this.dialogRef.close(data);
  }

  titleDisplay(value: any): string {
    this.titleValue = value;
    return value;
  }
  
  ownerDisplay(value: any): string {
    this.ownerValue = value;
    return value;
  }


  ngOnInit(): void {
    this.findTitles();
    this.findOwners();
  }

  findTitles() {
    this.docsService.getTitles(this.parentId).subscribe(
      (response) => {
        this.isLoading = false;
        this.titleOptions = response;
        this.filteredTitleOptions = this.titleControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterTitles(value))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  findOwners() {
    this.docsService.getOwners(this.parentId).subscribe(
      (response) => {        
        this.isLoading = false;
        this.ownerOptions = response;
        this.filteredOwnerOptions = this.ownerControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterOwners(value))
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
