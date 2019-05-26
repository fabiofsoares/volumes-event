import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { EventsService } from '../../services/events/events.service';
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

	constructor(
		private headerService: HeaderService,
		private _location: Location,
		private EventsService: EventsService,
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
		date_start: '',
		date_finish: '',
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

	public spreadEvent = async () => {
		try {
			const _eventSaved = await this.saveData(this.model);
			console.log('---- diffuser ----', _eventSaved);
		} catch (err) {
			console.log(err);
		}
	};

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
