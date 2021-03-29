import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Student } from '../models/student';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private serviceUrl = "https://localhost:44333/api/Students";

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

            this.http
                .post<Student>(this.serviceUrl, student)
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                        reject("Error saving.");
                        return this.handleError(err);
                    })
                )
                .subscribe((data) => {
                    this.dataStore.students.push(data);
                    this._students.next(Object.assign({}, this.dataStore).students);
                    resolve(data);
                });

            // mock save
            // setTimeout(() => {
            //     student.id = this.dataStore.students.length + 10;
            //     this.dataStore.students.push(student);
            //     this._students.next(Object.assign({}, this.dataStore).students);
            //     resolve(student);
            //     // reject("Error")
            // }, 2000);
        });
    }

    public updateStudent(student: Student): Promise<Student> {
        return new Promise((resolve: any, reject) => {
            this.http
                .put<Student>(this.serviceUrl, student)
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                        reject("Error saving.");
                        return this.handleError(err);
                    })
                )
                .subscribe((data) => {
                    this.dataStore.students.splice(this.dataStore.students.map(x => x.id).indexOf(student.id), 1, student);
                    this._students.next(Object.assign({}, this.dataStore).students);
                    resolve(data);
                });
            
            // mock save
            // setTimeout(() => {
            //     this.dataStore.students.splice(this.dataStore.students.map(x => x.id).indexOf(student.id), 1, student);
            //     this._students.next(Object.assign({}, this.dataStore).students);
            //     resolve(student);
            //     // reject("Error")
            // }, 2000);
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

    private handleError(err: HttpErrorResponse) {
        let errorMessage = err.error instanceof ErrorEvent ? err.error.message : err.message;
        console.error(errorMessage);

        return throwError(errorMessage);
    }
}