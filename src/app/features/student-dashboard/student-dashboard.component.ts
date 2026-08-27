import { Component, computed, inject, signal } from '@angular/core';

import { CourseCardComponent } from '../../ui/course-card/course-card.component';
import { CourseStore } from '../../store/course.store';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {

  readonly courseStore = inject(CourseStore);

  courses = computed(() => this.courseStore.entities());

  selectedCourse = signal<Course | null>(null);

  constructor() {
    this.courseStore.loadCourses();
  }

  handleEnroll(course: Course) {

    this.selectedCourse.set(course);

    console.log(
      'Enrollment requested for:',
      course.title
    );

  }

  handleDelete(course: Course) {

    this.courseStore.deleteCourse(course.id);

  }
}