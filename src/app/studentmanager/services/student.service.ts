import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Student } from '../models/student';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private serviceUrl = "api/students/students.json";

    private _students: BehaviorSubject<Student[]>;

    private dataStore: {
        students: Student[]
    }

    public get students(): Observable<Student[]> {
        return this._students.asObservable();
    }

    constructor(private http: HttpClient) {
        this.dataStore = {
            students: []
        };
        this._students = new BehaviorSubject<Student[]>([])
    }

    public addStudent(student: Student): Promise<Student> {
        return new Promise((resolve: any, reject) => {

            setTimeout(() => {
                student.id = this.dataStore.students.length + 10;
                this.dataStore.students.push(student);
                this._students.next(Object.assign({}, this.dataStore).students);
                resolve(student);
                // reject("Error")
            }, 2000);
        });
    }

    public updateStudent(student: Student): Promise<Student> {
        return new Promise((resolve: any, reject) => {
            setTimeout(() => {
                this.dataStore.students.splice(this.dataStore.students.map(x => x.id).indexOf(student.id), 1, student);
                this._students.next(Object.assign({}, this.dataStore).students);
                resolve(student);
                // reject("Error")
            }, 2000);
        });
    }

    public loadAll() {
        this.http.get<Student[]>(this.serviceUrl)
            .pipe(
                catchError(this.handleError)
            )
            .subscribe((data) => {
                console.log(data);
                this.dataStore.students = data;
                this._students.next(Object.assign({}, this.dataStore).students)
            }
        );
    }

    private handleError(err: HttpErrorResponse, caught: Observable<Student[]>) {
        let errorMessage = err.error instanceof ErrorEvent ? err.error.message : err.message;
        console.error(errorMessage);

        return throwError(errorMessage);
    }
}