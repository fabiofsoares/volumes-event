/* 
Importer l'interface pour définir les routes
*/
// Angular
import { Routes } from '@angular/router';

// Inner
import { HomePageComponent } from './routes/home-page/home-page.component';
import { SigninPageComponent } from './routes/signin-page/signin-page.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { MePageComponent } from './routes/me-page/me-page.component';
import { EventsPageComponent } from './routes/events-page/events-page.component';
import { DisplayEventPageComponent } from './routes/display-event-page/display-event-page.component';
import { EditEventPageComponent } from './routes/edit-event-page/edit-event-page.component';
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
		path: 'signin',
		component: SigninPageComponent
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'me',
		component: MePageComponent
	},
	{
		path: 'events',
		component: EventsPageComponent
	},
	{
		path: 'display-event',
		component: DisplayEventPageComponent
	},
	{
		path: 'edit-event',
		component: EditEventPageComponent
	}
];
//
