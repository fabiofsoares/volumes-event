import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { FormControl } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';
import { Location } from '@angular/common';

@Component({
	selector: 'app-edit-event-page',
	templateUrl: './edit-event-page.component.html',
	styleUrls: [ './edit-event-page.component.css' ],
	providers: [ HeaderService ]
})
export class EditEventPageComponent implements OnInit {
	date = new FormControl(new Date());

	model = {
		event: 'Workshop I.T',
		description:
			'Chocolate cake tart dragée ice cream cake chocolate gummies sesame snaps. Gingerbread macaroon pie biscuit lollipop pastry.',
		category: 'Class',
		address: '78 rue Compans 75019 PARIS',
		phoneNumber: '01 02 03 04 05',
		email: 'volumes.info@volumes.org'
	};

	faMapMarkerAlt = faMapMarkerAlt;
	faPhone = faPhone;
	faEnvelope = faEnvelope;
	faFacebook = faFacebook;
	faEtsy = faEtsy;

	submitted = false;

	onSubmit() {
		this.submitted = true;
	}

	backClicked() {
		this._location.back();
	}

	constructor(private headerService: HeaderService, private _location: Location) {}

	ngOnInit() {
		this.headerService.setTitle('Editer');
		this.headerService.isBacking = true;
		this.headerService.isSaving = true;
	}
}
