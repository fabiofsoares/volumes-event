import { Component, OnInit } from '@angular/core';

// Importer les interface pour configurer le formulaire
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importer le service
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrls: [ './signin-page.component.css' ],
	providers: [ AuthService ]
})
export class SigninPageComponent implements OnInit {
	public form: FormGroup;

	constructor(private FormBuilder: FormBuilder, private AuthService: AuthService) {}

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
			.then((apiResponse) => console.log(apiResponse))
			.catch((apiResponse) => console.error(apiResponse));
	};

	ngOnInit() {
		this.initForm();
	}
}
