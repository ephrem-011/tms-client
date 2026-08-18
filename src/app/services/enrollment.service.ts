import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

interface EnrollmentResponse {
  data: Enrollment[];
  meta: {
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:5239/api/v2/enrollments';

  getAll(): Observable<Enrollment[]> {
    return this.http
      .get<EnrollmentResponse>(this.baseUrl)
      .pipe(
        map(response => response.data)
      );
  }

  approve(id: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${id}/approve`,
      {}
    );
  }
}