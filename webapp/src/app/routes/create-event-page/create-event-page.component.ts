import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { EventsService } from '../../services/events/events.service';
import { EventbriteService } from '../../services/eventbrite/eventbrite.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-event-page',
	templateUrl: './create-event-page.component.html',
	styleUrls: [ './create-event-page.component.css' ],
	providers: [ HeaderService ]
})
export class CreateEventPageComponent implements OnInit {
	public form: FormGroup;
	private currentTicket = {
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
	private currentEvent;

	constructor(
		private headerService: HeaderService,
		private _location: Location,
		private EventsService: EventsService,
		private eventbriteService: EventbriteService,
		private FormBuilder: FormBuilder,
		private Router: Router
	) {}

	date = new FormControl(new Date());

	private initForm = () => {
		this.form = this.FormBuilder.group({
			// author: ['5c715755efe7bc1a60d3a57f'],
			date_start: [ '', Validators.required ],
			date_finish: [ '', Validators.required ],
			name: [ '', Validators.required ],
			description: [ '', Validators.required ],
			category: [ '', Validators.required ],
			place: [ '', Validators.required ],
			phone: [ '', [ Validators.required, Validators.min(1), Validators.max(20) ] ],
			mail: [ '', [ Validators.required, Validators.email ] ]
		});
	};

	model = {
		date_start: '2019-06-21T00:00:00.000Z',
		date_finish: '2019-06-20T00:00:00.000Z',
		name: '',
		description: '',
		category: '',
		place: "55 rue d'Amsterdam 75008 Paris",
		phone: '01 02 03 04 05',
		mail: 'volumes.info@volumes.fr',
		status: 'false'
	};

	faMapMarkerAlt = faMapMarkerAlt;
	faPhone = faPhone;
	faEnvelope = faEnvelope;
	faFacebook = faFacebook;
	faEtsy = faEtsy;
	submitted = false;

	public saveData = (data) => {
		console.log('data :', data);

		this.EventsService
			.create(data)
			.then((apiResponse) => {
				console.log('saveData : ', apiResponse);
				return Promise.resolve(apiResponse);
			})
			.catch((apiResponse) => console.error(apiResponse));
	};

	public createEvent = () => {
		this.saveData(this.model);
		this.Router.navigate([ 'events' ]);
	};

	public spreadEvent() {
		// console.log('this.model :', this.model);
		if (this.model != undefined) {
			this.currentEvent = {
				event: {
					name: {
						html: this.model.name
					},
					description: {
						html: this.model.description
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

			this.eventbriteService
				.postEvent(this.currentEvent)
				.then(() => this.eventbriteService.postTicket(this.currentTicket))
				.then(() => this.eventbriteService.postPublish(''))
				.then(() => this.Router.navigate([ 'events' ]));
		}
	}

	public backClicked = () => {
		this._location.back();
	};

	ngOnInit() {
		this.initForm();
		this.headerService.setTitle('Creer un évenement');
		this.headerService.isBacking = true;
		this.headerService.isSaving = true;
	}
}
