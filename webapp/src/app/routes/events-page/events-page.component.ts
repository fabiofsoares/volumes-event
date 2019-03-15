import { Component, OnInit } from '@angular/core';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importer le service
import { EventsService } from '../../services/events/events.service';

//Header
//import  Header  from '../../shared/header/header.component';

@Component({
	selector: 'app-events-page',
	template: `
    <app-header></app-header>
  `,
	templateUrl: './events-page.component.html',
	styleUrls: [ './events-page.component.css' ],
	providers: [ EventsService ]
})
export class EventsPageComponent implements OnInit {
	public form: FormGroup;

	constructor(private FormBuilder: FormBuilder, private EventsService: EventsService) {}

	private initForm = () => {
		this.form = this.FormBuilder.group({
			date_start: [ undefined, Validators.required ],
			date_finish: [ undefined, Validators.required ],
			name: [ undefined, Validators.required ],
			description: [ undefined, Validators.required ],
			category: [ undefined, Validators.required ],
			place: [ undefined, Validators.required ]
		});
	};

	public createCurrentEvent = () => {
		// Vérifier les champs
		this.EventsService
			.create(this.form.value)
			.then((apiResponse) => console.log(apiResponse))
			.catch((apiResponse) => console.error(apiResponse));
	};

	public getCurrentEvent = () => {
		this.EventsService.getEvent()
			.then((apiResponse) => console.log(apiResponse))
			.catch((apiResponse) => console.error(apiResponse));
	};

	ngOnInit() {
		this.initForm();
		this.getCurrentEvent();
	}
}
