import { StudentService } from './../../services/student.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { Student } from '../../models/student';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'v-create-student-dialog',
    templateUrl: './create-student-dialog.component.html',
    styleUrls: ['./create-student-dialog.component.scss']
})
export class CreateStudentDialogComponent implements OnInit {
    public student!: Student;
    public firstName = new FormControl('', [Validators.required]);
    public middleName = new FormControl('', []);
    public lastName = new FormControl('', [Validators.required]);
    public emailAddress = new FormControl('', [Validators.required, Validators.email]);
    public courses: Course[] = [];
    public isSaving = false;

    public get nameFormatted() {
        return this.student.firstName + (this.student.middleName ? ` ${this.student.middleName}` : "") + ` ${this.student.lastName}`;
    }

    constructor(
        private dialogRef: MatDialogRef<CreateStudentDialogComponent>,
        private service: StudentService,
        private snackBar: MatSnackBar
    ) {
        this.student = {
            id: -1,
            firstName: "",
            middleName: "",
            lastName: "",
            emailAddress: "",
            courses: []
        }
    }

    ngOnInit(): void {
    }

    public getErrorMessage(control: FormControl) {
        if (control.hasError("required")) {
            return "You must enter a value";
        }

        return control.hasError("email") ? "Not a valid email" : "";
    }

    public onSave() {
        if (this.firstName.invalid
            || this.lastName.invalid
            || this.middleName.invalid
            || this.emailAddress.invalid) {
            return;
        }

        const newStudent = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            middleName: this.middleName.value,
            emailAddress: this.emailAddress.value,
            courses: [...this.courses]
        } as Student;

        this.isSaving = true;
        this.service
            .addStudent(newStudent)
            .then(() => {
                this.snackBar.open("Saved student!", undefined, {
                    duration: 2000
                });
                this.dialogRef.close(newStudent);
            })
            .catch(() => {
                this.snackBar.open("Error saving", undefined, {
                    duration: 2000
                });
            })
            .finally(() => this.isSaving = false);
    }

    public onCancel() {
        this.dialogRef.close(null);
    }
}