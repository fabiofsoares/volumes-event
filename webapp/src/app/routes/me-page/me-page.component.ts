import { Component, OnInit } from '@angular/core';

// Importer le service
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-me-page',
	templateUrl: './me-page.component.html',
	styleUrls: [ './me-page.component.css' ],
	providers: [ AuthService ]
})
export class MePageComponent implements OnInit {
	currentUser = 'Test1';

	constructor(private AuthService: AuthService) {}

	ngOnInit() {}
}
