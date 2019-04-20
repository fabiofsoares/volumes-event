import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { HeaderService } from '../../services/header/header.service';
import { EventbriteService } from '../../services/eventbrite/eventbrite.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent implements OnInit {
	constructor(
		private headerService: HeaderService,
		private eventsService: EventsService,
		private eventbriteService: EventbriteService
	) {}

	// private events = [];
	private event = {
		event: {
			name: {
				html: 'Volumes Events - API'
			},
			description: {
				html: 'Volumes Events Description'
			},
			start: {
				timezone: 'America/Los_Angeles',
				utc: '2020-06-21T02:00:00Z'
			},
			end: {
				timezone: 'America/Los_Angeles',
				utc: '2020-08-15T02:00:00Z'
			},
			currency: 'USD'
		}
	};
	private eventId: String;

	public createEvent = () => {
		// Vérifier les champs
		this.eventbriteService
			.postEvent(this.event)
			.then((apiResponse) => {
				console.log(apiResponse);
				// eventId = apiResponse.id;
			})
			.catch((apiResponse) => console.error(apiResponse));

		// this.eventbriteService
		// 	.postTicket(this.eventId)
		// 	.then((apiResponse) => {
		// 		console.log(apiResponse);
		// 	})
		// 	.catch((apiResponse) => console.error(apiResponse));
	};

	// public getAll = () => {
	// 	this.eventsService.getEvent().subscribe((res: any[]) => {
	// 		this.events = res;
	// 		console.log(this.events);
	// 	});
	// };

	ngOnInit() {
		this.headerService.setTitle('Événements');
		// this.getAll();
	}
}
