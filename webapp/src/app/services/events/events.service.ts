import { Injectable } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	private apiUrl = `${environment.apiUrl}/events`;

	constructor(private HttpClient: HttpClient) {}

	public create = (data: EventModel): Promise<any> => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.post(`${this.apiUrl}`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public getEvent = () => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.get(`${this.apiUrl}/user/5c6c3ed3cdcb5a7655f55804`, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};
}
