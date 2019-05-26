/* 
Importer l'interface pour définir les routes
*/

// Angular
import { Routes } from '@angular/router';

// Auth-guard
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

// Inner
import { HomePageComponent } from './routes/home-page/home-page.component';
import { SigninPageComponent } from './routes/signin-page/signin-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MePageComponent } from './routes/me-page/me-page.component';
import { EventsPageComponent } from './routes/events-page/events-page.component';
import { EventPageComponent } from './routes/event-page/event-page.component';
import { DisplayEventPageComponent } from './routes/display-event-page/display-event-page.component';
import { EditEventPageComponent } from './routes/edit-event-page/edit-event-page.component';
import { CreateEventPageComponent } from './routes/create-event-page/create-event-page.component';
import { NotFoundPageComponent } from './routes/not-found-page/not-found-page.component';
import { SpreadEventComponent } from './routes/spread-event/spread-event.component';

//

/* 
Exporter une contante pour définir le comportement de la route
*/
export const MainRouter: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: 'home-page',
		component: HomePageComponent
	},
	{
		path: 'signin',
		component: SigninPageComponent
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'me',
		component: MePageComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'events',
		component: EventsPageComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'event/:id',
		component: EventPageComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'display-event',
		component: DisplayEventPageComponent
		// canActivate: [ AuthGuard ]
	},
	{
		path: 'edit-event',
		component: EditEventPageComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'create-event',
		component: CreateEventPageComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'spread-event/:id',
		component: SpreadEventComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: '**',
		component: NotFoundPageComponent
	}
];
//
