import { Component, inject, OnInit } from '@angular/core';
import { EnrollmentHubService } from '../../services/enrollment-hub.service';

import { EnrollmentStore } from '../../store/enrollment.store';

import { AnalyticsChartComponent } from '../../ui/analytics-chart/analytics-chart.component';

@Component({
  selector: 'tms-instructor-dashboard',
  standalone: true,
  imports: [
    AnalyticsChartComponent
  ],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent implements OnInit {

  store = inject(EnrollmentStore);
  hub = inject(EnrollmentHubService);
  

  ngOnInit(): void {
  
    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
    this.hub.start();

  }

}