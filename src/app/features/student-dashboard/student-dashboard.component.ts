import { Component, signal, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { CourseCardComponent } from '../../ui/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

  private api = inject(CourseService);

  selectedCourse = signal<Course | null>(null);

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  handleEnroll(course: Course) {

    this.selectedCourse.set(course);

    console.log('Enrollment requested for:', course.title);

  }

}