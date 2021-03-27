import { Observable } from 'rxjs';
import { StudentService } from './../../services/student.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';

@Component({
    selector: 'v-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    public isScreenSmall = false;
    public students: Observable<Student[]> | null = null;

    constructor(private breakpointObserver: BreakpointObserver, private studentService: StudentService) { }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            `(max-width: 720px)`
        ]).subscribe((state: BreakpointState) => {
            this.isScreenSmall = !state.matches;
        });

        this.students = this.studentService.students;
        this.studentService.loadAll();

        this.students.subscribe(data => {
            console.log(data);
        });
    }
}