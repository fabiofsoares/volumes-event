import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importer le service
import { EventsService } from '../../services/events/events.service';

//Header
//import  Header  from '../../shared/header/header.component';

@Component({
	selector: 'app-event-page',
	template: `
    <app-header></app-header>
  `,
	templateUrl: './event-page.component.html',
	styleUrls: [ './event-page.component.css' ],
	providers: [ EventsService, HeaderService ]
})
export class EventPageComponent implements OnInit {
	public form: FormGroup;
	public events = [];

	constructor(
		private FormBuilder: FormBuilder,
		private EventsService: EventsService,
		private headerService: HeaderService
	) {}



	public createCurrentEvent = () => {
	
		
	};


	ngOnInit() {
			
		//console.log('	this.EventsService : ', 	this.EventsService.getEvent())
		//this.getCurrentEvent();
		this.headerService.setTitle('évenements');
	}
}
