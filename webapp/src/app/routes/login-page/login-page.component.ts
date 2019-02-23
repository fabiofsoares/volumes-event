import { Component, OnInit } from '@angular/core';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importer le service
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.css' ],
	providers: [ AuthService ]
})
export class LoginPageComponent implements OnInit {
	public form: FormGroup;

	constructor(private FormBuilder: FormBuilder, private AuthService: AuthService) {}

	private initForm = () => {
		this.form = this.FormBuilder.group({
			email: [ undefined, Validators.required ],
			password: [ undefined, Validators.required ]
		});
	};

	public login = () => {
		// Vérifier les champs
		this.AuthService
			.login(this.form.value)
			.then((apiResponse) => console.log(apiResponse))
			.catch((apiResponse) => console.error(apiResponse));
	};

	ngOnInit() {
		this.initForm();
	}
}
