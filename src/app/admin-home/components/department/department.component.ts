import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeparmentModel } from '../../models/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  dataSet!: DeparmentModel[];
  isLoading: boolean = false;
  isModalvisable: boolean = false;
  validateForm!: FormGroup;
  user: DeparmentModel = new DeparmentModel();

  constructor() {}

  ngOnInit(): void {}

  /**data */

  /**events */
  onDelete(item: DeparmentModel) {}

  showModal() {}


}
