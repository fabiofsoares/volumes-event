import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { FormControl } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-display-event-page',
	templateUrl: './display-event-page.component.html',
	styleUrls: [ './display-event-page.component.css' ]
})
export class DisplayEventPageComponent implements OnInit {
	date = new FormControl(new Date());
	isPendingEvent = false;
	isOnFacebook = true;
	isOnEventbrite = true;
	faMapMarkerAlt = faMapMarkerAlt;
	faPhone = faPhone;
	faEnvelope = faEnvelope;
	faFacebook = faFacebook;
	faEtsy = faEtsy;

	constructor(private headerService: HeaderService) {}

	ngOnInit() {
		this.headerService.setTitle('Événement');
		this.headerService.isBacking = true;
		this.headerService.isEditing = true;
	}
}
