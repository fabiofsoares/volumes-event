import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importer le module pour la gestion des routes
import { RouterModule } from '@angular/router';

// Imprter le router
import { MainRouter } from './app-router';

// Importer les modules pour la gestion des formulaire
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { HeaderService } from '../app/services/header/header.service';

import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { SigninPageComponent } from './routes/signin-page/signin-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { MePageComponent } from './routes/me-page/me-page.component';
import { EventsPageComponent } from './routes/events-page/events-page.component';
import { DisplayEventPageComponent } from './routes/display-event-page/display-event-page.component';
import { EditEventPageComponent } from './routes/edit-event-page/edit-event-page.component';
import { CreateEventPageComponent } from './routes/create-event-page/create-event-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		SigninPageComponent,
		LoginPageComponent,
		HeaderComponent,
		MePageComponent,
		EventsPageComponent,
		DisplayEventPageComponent,
		EditEventPageComponent,
		CreateEventPageComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(MainRouter),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatInputModule,
		MatFormFieldModule,
		BrowserAnimationsModule,
		FontAwesomeModule
	],
	providers: [ HeaderService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
