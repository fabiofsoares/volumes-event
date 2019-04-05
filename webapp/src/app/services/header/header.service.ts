import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
	title = new BehaviorSubject('Title');

	constructor() {}

	setTitle(title: string) {
		// console.log('title :', title);
		this.title.next(title);
	}
}
