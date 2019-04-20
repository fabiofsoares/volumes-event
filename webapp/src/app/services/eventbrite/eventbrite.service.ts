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
	private access_token: string = 'CQW7U5JH2VCKZZ7YMR42';
	private organizationId: string = '302428015145';
	private eventId: string;
	private ticketId: string;

	constructor(private HttpClient: HttpClient) {}

	public getMe() {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient.get(`${this.eventbriteUrl}/users/me`, {
			headers: myHeader
		});
	}

	public postEvent = (data: EventbriteModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/organizations/${this.organizationId}/events/`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => {
				Promise.resolve(apiResponse);
				console.log('apiResponse :', apiResponse);
			})
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public postTicket = (data: TicketModel): Promise<any> => {
		let myHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);

		return this.HttpClient
			.post(`${this.eventbriteUrl}/organizations/${this.organizationId}/events/`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};
}
