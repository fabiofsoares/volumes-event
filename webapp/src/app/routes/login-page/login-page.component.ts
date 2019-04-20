import { Component, OnInit } from '@angular/core';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Importer le service
import { AuthService } from '../../services/auth/auth.service';

// Cookie service
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.css' ],
	providers: [ AuthService ]
})
export class LoginPageComponent implements OnInit {
	public form: FormGroup;

	private data = [];

	constructor(
		private FormBuilder: FormBuilder,
		private AuthService: AuthService,
		private Router: Router,
		private cookieService: CookieService
	) {}

	private initForm = () => {
		this.form = this.FormBuilder.group({
			email: [ undefined, Validators.required ],
			password: [ undefined, Validators.required ]
		});
	};

	public login = () => {
		this.AuthService
			.login(this.form.value)
			.then((apiResponse) => {
				this.cookieService.set('userToken', apiResponse.data.userToken);
				this.Router.navigate([ 'home-page' ]);
				console.log('Logged', apiResponse);
			})
			.catch((apiResponse) => console.error(apiResponse));
	};

	// public getUser = () => {
	// 	this.AuthService.getUser().subscribe((res: any[]) => {
	// 		this.data = res;
	// 		console.log(res);
	// 	});
	// };

	ngOnInit() {
		this.initForm();
	}
}
