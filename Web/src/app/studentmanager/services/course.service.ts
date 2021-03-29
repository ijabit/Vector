import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private serviceUrl = "https://localhost:44333/api/Courses";

    private _courses: BehaviorSubject<Course[]>;

    private dataStore: {
        courses: Course[]
    }

    public get courses(): Observable<Course[]> {
        return this._courses.asObservable();
    }

    constructor(private http: HttpClient) {
        this.dataStore = {
            courses: []
        };
        this._courses = new BehaviorSubject<Course[]>([])
    }

    loadAll() {
        this.http.get<Course[]>(this.serviceUrl)
            .pipe(
                catchError(this.handleError)
            )
            .subscribe((data) => {
                    console.log(data);
                    this.dataStore.courses = data;
                    this._courses.next(Object.assign({}, this.dataStore).courses)
                }
            );            
    }

    private handleError(err: HttpErrorResponse, caught: Observable<Course[]>) {
        let errorMessage = err.error instanceof ErrorEvent ? err.error.message : err.message;
        console.error(errorMessage);

        return throwError(errorMessage);
    }
}