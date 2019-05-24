import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators, ControlContainer } from '@angular/forms';

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
        private _Activatedroute:ActivatedRoute,
        private _router:Router,
        private headerService: HeaderService
    ){}



	public createCurrentEvent = () => {
	
		
	};


	ngOnInit() {
        this.id = this._Activatedroute.snapshot.params['id'];	
        console.log("ID PARAM : ", this.id)
		//console.log('	this.EventsService : ', 	this.EventsService.getEvent())
		//this.getCurrentEvent();
		this.headerService.setTitle('évenements');
	}
}
