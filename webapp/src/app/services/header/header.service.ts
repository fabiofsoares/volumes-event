import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
	title = new BehaviorSubject('Title');
	isBacking = false;
	isEditing = false;
	isSaving = false;

	constructor() {}

	setTitle(title: string) {
		// console.log('title :', title);
		this.title.next(title);
	}
}
