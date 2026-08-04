import { Component, effect, inject, viewChild } from '@angular/core';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss'
})
export class EnrollmentListComponent {

  store = inject(EnrollmentStore);


  displayedColumns = [
    'studentName',
    'courseName',
    'status',
    'actions'
  ];


  dataSource =
    new MatTableDataSource<Enrollment>();


  readonly paginator =
    viewChild.required(MatPaginator);


  readonly sort =
    viewChild.required(MatSort);



  constructor() {


    // Connect store data to Material table
    effect(() => {

      this.dataSource.data =
        this.store.entities();

    });



    // Connect paginator and sorting
    effect(() => {

      this.dataSource.paginator =
        this.paginator();


      this.dataSource.sort =
        this.sort();

    });



    // Load data
    this.store.loadEnrollments();

  }

}