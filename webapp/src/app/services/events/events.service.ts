import { Injectable } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	private apiUrl = `${environment.apiUrl}/events`;

	constructor(private HttpClient: HttpClient, private cookieService: CookieService, private Router: Router) {}

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

	public putEventStatus = (id, data: EventModel) => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');
		console.log('data to update :', data);

		return this.HttpClient.put(`${this.apiUrl}/change-status/${id}`, data, {
			headers: myHeader,
			responseType: 'text'
		});
	};

	public deleteEvent = (id): Promise<any> => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.delete(`${this.apiUrl}/event/${id}`, {
				headers: myHeader
			})
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.then(() => this.Router.navigate([ 'events' ]));
	};

	// public putEventStatus = (id) => {
	// 	let myHeader = new HttpHeaders();
	// 	myHeader.append('Content-Type', 'application/json');
	// 	let data = {
	// 		date_start: '2019-06-12T00:00:00.000Z',
	// 		date_finish: '2019-06-13T00:00:00.000Z',
	// 		name: 'Volumes Events - Kubernetes Edition',
	// 		description:
	// 			"We would like to invite you to the next Search Party in our Paris office. We'll be taking a look at the do’s and don’ts of a reliable and scalable Kubernetes deployment. It wouldn’t be a Search Party though if we didn’t also mix in plenty of food, drinks and a great atmosphere!",
	// 		status: 'approuved'
	// 	};

	// 	return this.HttpClient.put(`${this.apiUrl}/change-status/${id}`, data, {
	// 		headers: myHeader,
	// 		responseType: 'text'
	// 	});
	// };
}
