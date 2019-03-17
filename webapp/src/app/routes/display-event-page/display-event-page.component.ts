import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'app-display-event-page',
	templateUrl: './display-event-page.component.html',
	styleUrls: [ './display-event-page.component.css' ],
	providers: [ HeaderService ]
})
export class DisplayEventPageComponent implements OnInit {
	date = new FormControl(new Date());

	constructor(private headerService: HeaderService) {}

	ngOnInit() {
		this.headerService.setTitle('Evénement');
	}
}
