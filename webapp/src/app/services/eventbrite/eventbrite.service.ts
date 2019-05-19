import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EventbriteModel } from '../../models/eventbrite.model';
import { TicketModel } from '../../models/ticket.model';

@Injectable({
	providedIn: 'root'
})
export class EventbriteService {
	private eventbriteUrl = environment.eventbriteUrl;
	private access_token: string = '4H7Z6KFVJC7R2RWEKGAD';
	private organizationId: string = '302428015145';
	private eventId: string;

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

	public getMe() {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient.get(`${this.eventbriteUrl}/users/me`, {
			headers: myHeader
		});
	}

	public postEvent = (data: EventbriteModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/organizations/${this.organizationId}/events/`, data, {
				headers: myHeader
			})
			.toPromise()
			.then((apiResponse) => {
				Promise.resolve(apiResponse);

				// Filter and map into array for getting event id
				let obj = Object.keys(apiResponse)
					.filter((word) => word == 'id')
					.map((key) => ({ type: key, value: apiResponse[key] }));

				// Affect id to eventId
				this.eventId = obj[0].value;
			})
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public postTicket = (data: TicketModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/events/${this.eventId}/ticket_classes/`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => {
				Promise.resolve(apiResponse);
			})
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public postPublish = (data: ''): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/events/${this.eventId}/publish/`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => {
				Promise.resolve(apiResponse);
			})
			.catch((apiResponse) => Promise.reject(apiResponse));
	};
}
