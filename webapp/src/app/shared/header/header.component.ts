import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ],
	providers: [ HeaderService ]
})
export class HeaderComponent implements OnInit {
	title = '';
	constructor(private headerService: HeaderService, private _location: Location) {}

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		this.headerService.title.subscribe((title) => {
			this.title = title;
			// console.log('this.title :', this.title);
		});
	}
}
