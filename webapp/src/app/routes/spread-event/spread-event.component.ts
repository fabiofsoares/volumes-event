import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header/header.service';

// Importer le service
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-spread-event',
	templateUrl: './spread-event.component.html',
	styleUrls: [ './spread-event.component.css' ],
	providers: [ AuthService ]
})
export class SpreadEventComponent implements OnInit {
	currentUser = 'Test1';

	constructor(private AuthService: AuthService, private headerService: HeaderService) {}
	
	spreadMeetup(){

	}

	spreadFacebook(){

	}

	ngOnInit() {
		this.headerService.setTitle('Diffuser');
	}
}
