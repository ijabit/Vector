import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
    selector: 'v-assign-course-dialog',
    templateUrl: './assign-course-dialog.component.html',
    styleUrls: ['./assign-course-dialog.component.scss']
})
export class AssignCourseDialogComponent implements OnInit {
    public courses: Course[] = [];

    constructor(private dialogRef: MatDialogRef<AssignCourseDialogComponent>, private service: CourseService) { }

    ngOnInit(): void {
        this.service.courses.subscribe(courses => {
            this.courses = courses;
        });

        this.service.loadAll();
    }

    public courseSelected(course: Course) {
        this.dialogRef.close(course);
    }
}