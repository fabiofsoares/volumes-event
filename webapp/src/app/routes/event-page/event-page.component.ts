import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { EventsService } from '../../services/events/events.service';
import { EventModel } from '../../models/event.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-event-page',
	templateUrl: './event-page.component.html',
	styleUrls: [ './event-page.component.css' ],
	providers: [ EventsService, HeaderService ]
})
export class EventPageComponent implements OnInit {
	event: EventModel[] = [];
	private currentEvent = [];
	isPendingEvent = false;
	faMapMarkerAlt = faMapMarkerAlt;
	faPhone = faPhone;
	faEnvelope = faEnvelope;
	faFacebook = faFacebook;
	faEtsy = faEtsy;

	constructor(
		private EventsService: EventsService,
		private headerService: HeaderService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	public getEventById = (id) => {
		this.EventsService.getEventById(id).subscribe((eventData: EventModel[]) => {
			this.event = eventData;
			this.currentEvent.push(this.event);

			this.currentEvent.map((item) => {
				// console.log('item :', item);
				this.headerService.setTitle(item.name);

				if (item.status == null) {
					item.status = false;
				}

				if (item.status == 'true') {
					this.isPendingEvent = false;
				}

				if (item.status == 'false') {
					this.isPendingEvent = true;
				}
			});
		});
	};

	public getEventId = (id) => {
		this.EventsService.getEventById(id).subscribe((eventData: EventModel[]) => {
			this.event = eventData;
		});
	};

	public goToSpreadingEvent = (eventId) => {
		this.router.navigateByUrl('/event/' + eventId);
	};

	ngOnInit() {
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.getEventById(params['id']);
			}
		});
		this.headerService.isBacking = true;
		this.headerService.isEditing = true;
	}
}
