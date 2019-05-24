import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ],
	providers: [ AuthService ]
})
export class HeaderComponent implements OnInit {
	title = '';

	constructor(private headerService: HeaderService, private _location: Location, private authService: AuthService) {}

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		this.headerService.title.subscribe((updatedTitle) => {
			this.title = updatedTitle;
		});
	}
}
