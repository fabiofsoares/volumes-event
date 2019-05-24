import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrls: [ './signin-page.component.css' ],
	providers: [ AuthService ]
})
export class SigninPageComponent implements OnInit {
	public form: FormGroup;

	constructor(private FormBuilder: FormBuilder, private AuthService: AuthService, private Router: Router) {}

	private initForm = () => {
		this.form = this.FormBuilder.group({
			first_name: [ undefined, Validators.required ],
			last_name: [ undefined, Validators.required ],
			email: [ undefined, Validators.required ],
			password: [ undefined, Validators.required ]
		});
	};

	public signin = () => {
		// Vérifier les champs
		this.AuthService
			.signin(this.form.value)
			.then(() => this.Router.navigate([ 'login' ]))
			.catch((apiResponse) => console.error(apiResponse));
	};

	ngOnInit() {
		this.initForm();
	}
}
