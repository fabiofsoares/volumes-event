import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { HeaderService } from '../../services/header/header.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.css' ]
})
export class HomePageComponent implements OnInit {
	constructor(private headerService: HeaderService, private eventsService: EventsService) {}

	public events = [];

	public getAll = () => {
		this.eventsService.getEvent().subscribe((res: any[]) => {
			this.events = res;
			console.log(this.events);
		});
	};

	ngOnInit() {
		this.headerService.setTitle('Événements');
		this.getAll();
	}
}
