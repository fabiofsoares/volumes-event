import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Cookie service
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = `${environment.apiUrl}/user`;

	constructor(private HttpClient: HttpClient, private cookieService: CookieService) {}

	public isLoggedIn() {
		let tokenCookieValue = this.cookieService.get('userToken');
		if (tokenCookieValue !== '') {
			return true;
		} else {
			return false;
		}
	}

	public signin = (data: UserModel): Promise<any> => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.post(`${this.apiUrl}/register`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public login = (data: UserModel): Promise<any> => {
		let myHeader = new HttpHeaders();
		myHeader.append('Content-Type', 'application/json');

		return this.HttpClient
			.post(`${this.apiUrl}/login`, data, { headers: myHeader })
			.toPromise()
			.then((apiResponse) => Promise.resolve(apiResponse))
			.catch((apiResponse) => Promise.reject(apiResponse));
	};

	public getUser() {
		let myHeader = new HttpHeaders().set('Content-Type', 'application/json');

		return this.HttpClient.get(`${this.apiUrl}/me`, {
			headers: myHeader
		});
	}
}
