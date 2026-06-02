import {Temporal} from "@js-temporal/polyfill";
export interface ErollmentRecord{
    readonly studentId: string;
    readonly courseCode: string;
    enrolledAt: Temporal.Instant;
}

export type EnrollmentStatus =
    | {
          status: "PENDING";
          requestedAt: Temporal.Instant;
          studentId: string;
          courseId: string;
      }
    | {
          status: "APPROVED";
          approvedBy: string;
          approvedAt: Temporal.Instant;
      };