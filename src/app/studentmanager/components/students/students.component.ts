import { CreateStudentDialogComponent } from './create-student-dialog.component';
import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'v-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
    public loading = true;
    public students: Student[] = [];

    constructor(private service: StudentService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.service.students.subscribe(students => {
            this.students = students;
        });

        this.service.loadAll();
    }

    public openCreateStudentDialog() {
        this.dialog.open(CreateStudentDialogComponent, {
            width: "80%", 
        });

        // dialogRef.componentInstance.savingChanges.subscribe((isSaving: boolean) => {
        //     debugger;
        //     this.loading = isSaving;
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     this.loading = false;
        // });
    }
}