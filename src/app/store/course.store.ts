import { inject } from '@angular/core';

import {
  signalStore,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';

import {
  withEntities,
  removeEntity,
  setAllEntities,
} from '@ngrx/signals/entities';

import { catchError, EMPTY } from 'rxjs';

import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

export const CourseStore = signalStore(
  { providedIn: 'root' },

  withState({
    isLoading: false,
    error: null as string | null,
  }),

  withEntities<Course>(),

  withMethods(
    (
      store,
      api = inject(CourseService)
    ) => ({

      loadCourses: () => {

        patchState(store, {
          isLoading: true,
          error: null
        });

        api.getAll().subscribe({
          next: courses => {
            patchState(
              store,
              setAllEntities(courses),
              {
                isLoading: false
              }
            );
          },

          error: err => {
            patchState(store, {
              isLoading: false,
              error: err.message
            });
          }
        });
      },

      deleteCourse: (id: number) => {

        // Snapshot BEFORE deleting.
        const previousSnapshot = store.entities();

        // Optimistic deletion.
        patchState(
          store,
          removeEntity(id)
        );

        // Delete on backend.
        api.delete(id).pipe(

          catchError(err => {

            // Roll back if backend rejects deletion.
            patchState(
              store,
              setAllEntities(previousSnapshot)
            );

            patchState(store, {
              error:
                'Cannot delete course: active student enrollments exist.'
            });

            return EMPTY;
          })

        ).subscribe();
      }

    })
  )
);