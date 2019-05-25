import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { EventbriteService } from '../../services/eventbrite/eventbrite.service';

@Component({
	selector: 'app-spread-event',
	templateUrl: './spread-event.component.html',
	styleUrls: [ './spread-event.component.css' ],
	providers: [ AuthService ]
})
export class SpreadEventComponent implements OnInit {
	currentUser = 'Test1';
	public currentEvent = {
		event: {
			name: {
				html: 'Event Test'
			},
			description: {
				html: 'Event Test Description'
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

	public currentTicket = {
		ticket_class: {
			name: 'Volumes Events Ticket',
			description: 'General Admission',
			free: true,
			minimum_quantity: 1,
			maximum_quantity: 10,
			quantity_total: 100,
			has_pdf_ticket: true,
			delivery_methods: 'electronic'
		}
	};

	constructor(
		private authService: AuthService,
		private _Activatedroute:ActivatedRoute,
        private _router:Router,
		private headerService: HeaderService,
		private eventbriteService: EventbriteService
	) {}

	spreadMeetup() {}

	spreadEventbrite() {
		this.eventbriteService
			.postEvent(this.currentEvent)
			.then(() => this.eventbriteService.postTicket(this.currentTicket))
			.then(() => this.eventbriteService.postPublish(''));
	}

	ngOnInit() {
		//id de l'evenement
		this.id = this._Activatedroute.snapshot.params['id'];
		console.log('event id ', this.id)
		
		this.headerService.setTitle('Diffuser');
		this.headerService.isBacking = true;
	}
}
