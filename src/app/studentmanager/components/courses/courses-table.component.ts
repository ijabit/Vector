import { Course } from './../../models/course';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'v-courses-table',
    templateUrl: './courses-table.component.html',
    styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent implements OnInit, AfterViewInit {
    @Input() public courses: Course[] = [];

    public displayedColumns = ["name", "content"];
    public dataSource!: MatTableDataSource<Course>;
    public isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
    @ViewChild(MatSort) sort: MatSort | null = null;

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Course>(this.courses);
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
}