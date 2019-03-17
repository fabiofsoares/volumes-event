import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-edit-event-page',
	templateUrl: './edit-event-page.component.html',
	styleUrls: [ './edit-event-page.component.css' ],
	providers: [ HeaderService ]
})
export class EditEventPageComponent implements OnInit {
	date = new FormControl(new Date());

	constructor(private headerService: HeaderService) {}

	ngOnInit() {
		this.headerService.setTitle('Editer');
	}
}
