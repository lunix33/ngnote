import { Component, Output, EventEmitter, HostListener } from '@angular/core';

import { Note, NoteSearchCriterions, PublicCriterion, OrderCriterion, NoteSearchResponse } from '../../models/note'
import { LoginUserService } from 'src/app/services/login-user.service';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

	public notes: NoteSearchResponse[] = [];
	public collapsed: boolean = false;
	private breakpoint: number = 768;

	constructor(liUsrSrv: LoginUserService) {
		this.onWindowResize(null);

		let user: User = liUsrSrv.get
		const opts: NoteSearchCriterions = {
			Username: (user) ? user.Username : null,
			Public: (!user) ? PublicCriterion.ONLY : null,
			Limit: 30,
			Order: OrderCriterion.UPDATED
		}
		Note.Search(opts)
			.then((notes: NoteSearchResponse[]) => { this.notes = notes })
			.catch(err => console.error(err))
	}

	/**
	 * Event fired when the window is resized.
	 * @param event The event fired
	 */
	@HostListener('window:resize', ['$event'])
	onWindowResize(event: Event) {
		// Get the client width and show/hide the menu based on the breakpoint.
		const width = document.querySelector('html').clientWidth;
		this.collapsed = width < this.breakpoint;
	}
}
