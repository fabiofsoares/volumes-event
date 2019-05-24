import { Injectable } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	private apiUrl = `${environment.apiUrl}/events`;

	constructor(private HttpClient: HttpClient, private cookieService: CookieService) {}

	public create = (data: EventModel): Promise<any> => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.post(`${this.apiUrl}/event`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public getEvent = () => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');
		let userid = this.cookieService.get('userid');

		return this.HttpClient.get(`${this.apiUrl}/user/${userid}`, {
			headers: myHeader
		});
	};

	public getEventById = (id) => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient.get(`${this.apiUrl}/event/${id}`, {
			headers: myHeader
		});
	};
}
