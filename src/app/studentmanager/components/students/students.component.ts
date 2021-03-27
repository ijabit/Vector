import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'v-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
    public students: Observable<Student[]> | null = null;

    constructor(private service: StudentService) { }

    ngOnInit(): void {
        // this.service.students.subscribe(students => {
        //     this.students = this.students;
        // });

        this.students = this.service.students;
        this.service.loadAll();
    }
}