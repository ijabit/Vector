import { StudentService } from './../../services/student.service';
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

    constructor(private service: StudentService) { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.isLoadingResults = false;
        this.service.students.subscribe((students: Student[]) => {
            this.dataSource.data = students;
            this.isLoadingResults = false;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data: Student, sortHeaderId: string) => {
            return sortHeaderId === "courseCount" ? data.courses.length : data[sortHeaderId as keyof typeof data] as any;
        }
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public collapseStudentDetails() {
        this.expandedStudent = null;
    }

    public detailsSaving(isSaving: boolean) {
        this.isLoadingResults = isSaving;
    }
}