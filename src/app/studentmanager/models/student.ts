import { Course } from "./course";

export interface Student {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    emailAddress: string;

    courses: Course[];
}
