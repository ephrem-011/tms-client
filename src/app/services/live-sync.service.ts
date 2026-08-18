import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HubConnection,
  HubConnectionBuilder
} from '@microsoft/signalr';
import { Subject } from 'rxjs';

export interface EnrollmentStatusEvent {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Injectable({
  providedIn: 'root'
})
export class LiveSyncService {

  private platformId = inject(PLATFORM_ID);

  private connection: HubConnection | null = null;

  private eventsSubject = new Subject<EnrollmentStatusEvent>();

  events$ = this.eventsSubject.asObservable();

  connectionState = signal<
    'connected' | 'reconnecting' | 'disconnected'
  >('disconnected');

  connect(): void {

    if (this.connection) {
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl('/hubs/enrollment')
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    this.connection.on(
      'ReceiveEnrollmentStatusUpdated',
      (
        enrollmentId: string,
        status: 'Pending' | 'Approved' | 'Rejected'
      ) => {
        this.eventsSubject.next({
          id: enrollmentId,
          status
        });
      }
    );

    this.connection.onreconnecting(() => {
      this.connectionState.set('reconnecting');
      console.log('SignalR reconnecting...');
    });

    this.connection.onreconnected(() => {
      this.connectionState.set('connected');
      console.log('SignalR reconnected.');
    });

    this.connection.onclose(() => {
      this.connectionState.set('disconnected');
      console.log('SignalR disconnected.');
    });

    this.connection
      .start()
      .then(() => {
        this.connectionState.set('connected');
        console.log('SignalR connected.');
      })
      .catch(err => {
        console.error('SignalR connection error:', err);
      });
  }
}
