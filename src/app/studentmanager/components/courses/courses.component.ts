import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'v-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    public courses: Course[] = [];

    constructor(private service: CourseService) { }

    ngOnInit(): void {
        this.service.courses.subscribe(courses => {
            this.courses = courses;
        });

        this.service.loadAll();
    }
}