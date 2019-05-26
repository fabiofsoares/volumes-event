import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { EventsService } from '../../services/events/events.service';
import { EventModel } from '../../models/event.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-events-page',
	templateUrl: './events-page.component.html',
	styleUrls: [ './events-page.component.css' ],
	providers: [ EventsService, HeaderService ]
})
export class EventsPageComponent implements OnInit {
	events: EventModel[] = [];

	constructor(
		private EventsService: EventsService,
		private headerService: HeaderService,
		private router: Router,
		private cookieService: CookieService
	) {}

	public getAll = () => {
		this.EventsService.getEvent().subscribe((eventsData: EventModel[]) => {
			this.events = eventsData;
		});
	};

	public goToEvent = (eventId) => {
		this.router.navigateByUrl('/event/' + eventId);
	};

	ngOnInit() {
		this.getAll();
		this.headerService.setTitle('événements');
	}
}
