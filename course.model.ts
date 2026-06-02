import {Temporal} from "@js-temporal/poyfill";
export interface Course{
    readonly id:string;
   title: string;
   capacity: number;
   startDate?: Temporal.plainDate;
}