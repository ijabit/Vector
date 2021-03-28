import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../models/student';

@Component({
    selector: 'v-students-table',
    templateUrl: './students-table.component.html',
    styleUrls: ['./students-table.component.scss'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ]
})
export class StudentsTableComponent implements OnInit, AfterViewInit {
    @Input() public students: Student[] = [];

    public displayedColumns = ["firstName", "middleName", "lastName", "emailAddress", "courseCount"];
    public dataSource!: MatTableDataSource<Student>;
    public expandedStudent: Student | null = null;
    public isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    @ViewChild(MatSort) sort: MatSort | null = null;

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.isLoadingResults = false;
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;        
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    updateStudent(updatedStudent: Student) {
        Object.assign(this.expandedStudent, updatedStudent);
        this.expandedStudent = null;
    }

    cancelUpdateStudent() {
        this.expandedStudent = null;
    }
}