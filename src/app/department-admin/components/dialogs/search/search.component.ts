import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DocsService } from '../../../services/docs.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  searchInout: any;
  filteredOptions!: Observable<string[]>;
  isLoading: boolean = false;
  options!: string[];
  titleOptions!: string[];
  ownerOptions!: string[];
  parentId: string;
  searchFilter: any;

  constructor(
    private dialogRef: MatDialogRef<SearchComponent>,
    private docsService: DocsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.parentId = data.parentId;
  }

  ngOnInit(): void {

   }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /**event */
  search() {
    let data = {
      searchFilter: this.searchFilter,
      searchValue: this.searchInout,
    };
    this.dialogRef.close(data);
  }

 

  displayFn(value: any): string {
    this.searchInout = value;
    return value;
  }


  OnHumanSelected(SelectedHuman: any) {
    this.searchInout = SelectedHuman;
    let data = {
      searchFilter: this.searchFilter,
      searchValue: this.searchInout,
    };
    this.dialogRef.close(data);
  }

  onFilterelected(filterVlaue: string) {
    this.isLoading = true;
    switch (filterVlaue) {
      case 'code':
        this.searchFilter = 'code';
        this.docsService.getCodes(this.parentId).subscribe(
          (response) => {
            this.isLoading = false;
            this.options = response;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value))
            );
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 'title':
        this.searchFilter = 'title';
        this.docsService.getTitles(this.parentId).subscribe(
          (response) => {
            this.isLoading = false;
            this.options = response;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value))
            );
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 'owner':
        this.searchFilter = 'owner';
        this.docsService.getOwners(this.parentId).subscribe(
          (response) => {
            this.isLoading = false;
            this.options = response;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value))
            );
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 'dates':
        this.searchFilter = 'dates';
        this.docsService.getDates(this.parentId).subscribe(
          (response) => {
            this.isLoading = false;
            this.options = response;
            this.filteredOptions = this.myControl.valueChanges.pipe(
              startWith(''),
              map((value) => this._filter(value))
            );
          },
          (error) => {
            console.log(error);
          }
        );
        break;
    }
  }
}
