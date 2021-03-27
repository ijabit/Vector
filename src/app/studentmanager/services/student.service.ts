import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
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

    loadAll() {
        const test = this.http.get<Student[]>(this.serviceUrl)
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