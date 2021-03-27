import { Course } from "./course";

export interface Student {
    firstName: string;
    middleName: string | null;
    lastName: string;
    emailAddress: string;

    courses: Course[];
}
