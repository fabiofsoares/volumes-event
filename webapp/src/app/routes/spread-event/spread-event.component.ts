import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { AuthService } from '../../services/auth/auth.service';
import { EventbriteService } from '../../services/eventbrite/eventbrite.service';
import { EventsService } from '../../services/events/events.service';

@Component({
	selector: 'app-spread-event',
	templateUrl: './spread-event.component.html',
	styleUrls: [ './spread-event.component.css' ],
	providers: [ AuthService, EventsService ]
})
export class SpreadEventComponent implements OnInit {
	public currentEvent;

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

	private event = [];
	private currentSpreadEvent = [];
	private eventToUpdate;

	constructor(
		private authService: AuthService,
		private _Activatedroute: ActivatedRoute,
		private Router: Router,
		private route: ActivatedRoute,
		private headerService: HeaderService,
		private eventbriteService: EventbriteService,
		private EventsService: EventsService
	) {}

	spreadMeetup() {}

	public getSpreadEventById = (id) => {
		this.EventsService.getEventById(id).subscribe((eventData: any[]) => {
			this.event = eventData;
			this.currentSpreadEvent.push(this.event);
			this.eventToUpdate = this.event;

			this.currentSpreadEvent.map((item) => {
				this.currentEvent = {
					event: {
						name: {
							html: item.name
						},
						description: {
							html: item.description
						},
						start: {
							timezone: 'America/Los_Angeles',
							utc: '2019-06-21T02:00:00Z'
						},
						end: {
							timezone: 'America/Los_Angeles',
							utc: '2019-06-22T02:00:00Z'
						},
						currency: 'EUR'
					}
				};
				// console.log('this.currentEvent :', this.currentEvent);
			});

			// Change status to true
			// delete this.eventToUpdate._id;
			delete this.eventToUpdate.author;
			delete this.eventToUpdate.date_creation;
			delete this.eventToUpdate.__v;
			delete this.eventToUpdate.__proto__;
			this.eventToUpdate.status = 'true';
			console.log('this.eventToUpdate :', this.eventToUpdate);
		});
	};

	updateEventStatus = (id, data) => {
		this.EventsService.putEventStatus(id, data).subscribe((response) => {
			console.log('response :', response);
		});
	};

	spreadEventbrite() {
		console.log('this.currentEvent :', this.currentEvent);
		if (this.currentEvent != undefined) {
			this.eventbriteService
				.postEvent(this.currentEvent)
				.then(() => this.eventbriteService.postTicket(this.currentTicket))
				.then(() => this.eventbriteService.postPublish(''))
				.then(() => {
					this.route.params.subscribe((params) => {
						if (params['id']) {
							console.log("params['id'] :", params['id']);
							this.updateEventStatus(params['id'], this.eventToUpdate);
						}
					});
				})
				.then(() => this.Router.navigate([ 'events' ]));
		}
	}

	ngOnInit() {
		//id de l'evenement
		// this.id = this._Activatedroute.snapshot.params['id'];
		// console.log('event id ', this.id)
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.getSpreadEventById(params['id']);
			}
		});

		this.headerService.setTitle('Diffuser');
		this.headerService.isBacking = true;
	}
}
