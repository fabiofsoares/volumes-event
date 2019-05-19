import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EventbriteModel } from '../../models/eventbrite.model';
import { TicketModel } from '../../models/ticket.model';

@Injectable({
	providedIn: 'root'
})
export class EventbriteService {
	private userUrl: string;
	private eventUrl: string;
	private albumsUrl: string;
	private albumUrl: string;
	private eventbriteUrl = environment.eventbriteUrl;
	private access_token: string = '4H7Z6KFVJC7R2RWEKGAD';
	private organizationId: string = '302428015145';
	private eventId: string;
	private ticketId: string;

	constructor(private HttpClient: HttpClient) {}

	public currentTicket = {
		ticket_class: {
			name: 'Volumes Events Ticket',
			description: 'General Admission',
			free: true,
			minimum_quantity: 1,
			maximum_quantity: 10,
			quantity_total: 100,
			has_pdf_ticket: true,
			delivery_methods: 'electronic'
		}
	};

	// public myHeader = new HttpHeaders();

	// public getMe() {
	// 	// let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
	// 	let myHeader = new HttpHeaders();

	// 	return this.HttpClient.get(`${this.eventbriteUrl}/users/me`, {
	// 		headers: myHeader
	// 	});
	// }

	public postEvent = (data: EventbriteModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
		// let myHeader = new HttpHeaders();
		// console.log('postEvent myHeader :', myHeader);

		return (
			this.HttpClient
				.post(`${this.eventbriteUrl}/organizations/${this.organizationId}/events/`, data, {
					headers: myHeader
				})
				.toPromise()
				.then((apiResponse) => {
					Promise.resolve(apiResponse);
					// console.log('apiResponse :', apiResponse);

					// Filter and map into array for getting event id
					let obj = Object.keys(apiResponse)
						.filter((word) => word == 'id')
						.map((key) => ({ type: key, value: apiResponse[key] }));

					// Affect id to eventId
					this.eventId = obj[0].value;
					console.log('this.eventId :', this.eventId);
				})
				// .then(() => {
				// 	console.log('coucou');
				// 	this.postTicket(this.currentTicket);
				// })
				.catch((apiResponse) => Promise.reject(apiResponse))
		);
	};

	public postTicket = (data: TicketModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
		// let myHeader = new HttpHeaders();
		// console.log('2 postTicket myHeader :', myHeader);

		return (
			this.HttpClient
				.post(`${this.eventbriteUrl}/events/${this.eventId}/ticket_classes/`, data, { headers: myHeader })
				.toPromise()
				.then((apiResponse) => {
					Promise.resolve(apiResponse);
					// console.log('apiResponse :', apiResponse);
				})
				// .then(() => {
				// 	this.postPublish();
				// })
				.catch((apiResponse) => Promise.reject(apiResponse))
		);
	};

	public postPublish = (): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
		// let myHeader = new HttpHeaders();
		// console.log('3 postPublish myHeader :', myHeader);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/events/${this.eventId}/publish/`, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => {
				Promise.resolve(apiResponse);
				console.log('apiResponse :', apiResponse);
			})
			.catch((apiResponse) => Promise.reject(apiResponse));

		// return this.HttpClient.post(`${this.eventbriteUrl}/events/${this.eventId}/publish/`, {
		// 	headers: myHeader
		// });
	};
}
