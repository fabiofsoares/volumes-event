import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { faMap, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-display-event-page',
	templateUrl: './display-event-page.component.html',
	styleUrls: [ './display-event-page.component.css' ],
	providers: [ HeaderService ]
})
export class DisplayEventPageComponent implements OnInit {
	date = new FormControl(new Date());
	isPendingEvent = false;
	isOnFacebook = true;
	isOnEventbrite = true;
	faFacebook = faFacebook;
	faEtsy = faEtsy;

	constructor(private headerService: HeaderService) {}

	ngOnInit() {
		this.headerService.setTitle('Evénement');
	}
}
