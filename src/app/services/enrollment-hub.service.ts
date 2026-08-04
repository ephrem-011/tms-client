import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { EnrollmentStore } from '../store/enrollment.store';


@Injectable({
providedIn:'root'
})
export class EnrollmentHubService {


private connection?: HubConnection;


private store = inject(EnrollmentStore);


start(){

this.connection =
new HubConnectionBuilder()
.withUrl(
'https://localhost:5239/hubs/enrollment'
)
.withAutomaticReconnect()
.build();


this.connection.on(
'EnrollmentApproved',
(id:string)=>{

this.store.updateStatus(id,'Approved');

});


return this.connection.start();

}


}
