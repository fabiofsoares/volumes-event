import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	title = '';
	// isEditing = false;

	constructor(private headerService: HeaderService, private _location: Location) {}

	backClicked() {
		this._location.back();
	}

	checkLocation(view) {
		if (view === 'landing') {
			return true;
		} else {
			return false;
		}
	}

	ngOnInit() {
		this.headerService.title.subscribe((updatedTitle) => {
			this.title = updatedTitle;
		});
	}
}
