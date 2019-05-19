import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
// Import interface to use Angular form technic
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faEtsy } from '@fortawesome/free-brands-svg-icons';
import { Location } from '@angular/common';
// Importer le service
import { EventsService } from '../../services/events/events.service';

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
		private FormBuilder: FormBuilder
	) {}

	date = new FormControl(new Date());

	private initForm = () => {
		this.form = this.FormBuilder.group({
			// author: ['5c715755efe7bc1a60d3a57f'],
			event: [ '', Validators.required ],
			description: [ '', Validators.required ],
			category: [ '', Validators.required ],
			email: [ '', [ Validators.required, Validators.email ] ],
			date_start: [ '', Validators.required ],
			date_finish: [ '', Validators.required ],
			phoneNumber: [ '', [ Validators.required, Validators.min(1), Validators.max(20) ] ]
		});
		console.log(this.form);
	};

	model = {
		name: '',
		description: '',
		category: '',
		place: ''
		//phoneNumber: '',
		//email: '',
		//   date_start: '',
		//   date_finish: ''
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
				console.log('saveData : ', apiResponse)
				
				return Promise.resolve(apiResponse)
			})
		.catch((apiResponse) => console.error(apiResponse));
	}

	public createEvent = () => {
		this.saveData(this.model)
		window.location.href = '/events';
	};

	public spreadEvent = async () => {
		try {
			const _eventSaved = await this.saveData(this.model)
			console.log('---- diffuser ----', _eventSaved);
		} catch (err){
			console.log(err)
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
