import {Temporal} from "@js-temporal/poyfill";
export interface Student {
    readonly id:string;
    name: string;
    enrollmentDate: Temporal.instant;
    gpa?: number;
}