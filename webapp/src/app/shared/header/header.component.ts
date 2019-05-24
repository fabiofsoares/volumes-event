import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ],
	providers: [ AuthService ]
})
export class HeaderComponent implements OnInit {
	title = '';

	constructor(
		private headerService: HeaderService,
		private _location: Location,
		private authService: AuthService,
		private Router: Router,
		private cookieService: CookieService
	) {}

	backClicked() {
		this._location.back();
	}

	logout = () => {
		this.cookieService.delete('userToken');
		this.cookieService.delete('userid');
		this.Router.navigate([ 'home-page' ]);
		console.log('Logged out !');
	};

	ngOnInit() {
		this.headerService.title.subscribe((updatedTitle) => {
			this.title = updatedTitle;
		});
	}
}
