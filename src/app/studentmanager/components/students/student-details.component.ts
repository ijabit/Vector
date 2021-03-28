import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { Course } from '../../models/course';
import { Student } from '../../models/student';
import { AssignCourseDialogComponent } from './assign-course-dialog.component';

@Component({
    selector: 'v-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
    @Input() public student!: Student;
    @Output() saveChanges = new EventEmitter<Student>();
    @Output() cancel = new EventEmitter<void>();
    public firstName = new FormControl('', [Validators.required]);
    public middleName = new FormControl('', []);
    public lastName = new FormControl('', [Validators.required]);
    public emailAddress = new FormControl('', [Validators.required, Validators.email]);
    public courses: Course[] = [];

    public get nameFormatted() {
        return this.student.firstName + (this.student.middleName ? ` ${this.student.middleName}` : "") + ` ${this.student.lastName}`;
    }

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.firstName.setValue(this.student.firstName);
        this.middleName.setValue(this.student.middleName);
        this.lastName.setValue(this.student.lastName);
        this.emailAddress.setValue(this.student.emailAddress);
        this.courses.push(...this.student.courses);
    }

    public onSave() {
        if (this.firstName.invalid
            || this.lastName.invalid
            || this.middleName.invalid
            || this.emailAddress.invalid) {
            return;
        }

        const updatedStudent = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            middleName: this.middleName.value,
            emailAddress: this.emailAddress.value
        } as Student;

        this.saveChanges.emit(updatedStudent);
    }

    public onCancel() {
        this.cancel.emit();
    }

    public getErrorMessage(control: FormControl) {
        if (control.hasError("required")) {
            return "You must enter a value";
        }

        return control.hasError("email") ? "Not a valid email" : "";
    }

    public removeCourses(selectedCourses: MatListOption[]) {
        const coursesToRemove = selectedCourses.map(x => x.value);
        for (const course of coursesToRemove) {
            this.courses.splice(this.courses.indexOf(course), 1);
        }
    }

    public openAddCourseDialog(): void {
        let dialogRef = this.dialog.open(AssignCourseDialogComponent, {
            width: "80%"
        });

        dialogRef.afterClosed().subscribe(result => {
            this.courses.push(result);
        });
    }
}