import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'v-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
    public students: Student[] = [];

    constructor(private service: StudentService) { }

    ngOnInit(): void {
        this.service.students.subscribe(students => {
            this.students = students;
        });

        this.service.loadAll();
    }
}