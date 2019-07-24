import { Component } from '@angular/core';

import { Note, PublicCriterion } from '../../class/note';
import { HttpStatusCode } from 'src/app/class/httpstatus';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	public notes: Note[] = [];

	constructor() {
		Note.Search({ Public: PublicCriterion.ONLY })
			.then(x => this.notes = x)
			.catch(err => console.log(err))
	}

	/**
	 * Event fired when the delete icon is clicked.
	 * @param e The event fired.
	 * @param n The note on the row
	 */
	async onDeleteBtnClick(e: Event, n: Note) {
		e.preventDefault();

		try {
			await n.Delete()
			const idx = this.notes.findIndex(x => x.ID === n.ID)
			this.notes.splice(idx, 1);
		}
		catch(err) {
			if (err instanceof Error) {
				console.error(err)
			} else {
				if (err.Status = HttpStatusCode.NotFound) {
					// Model
					console.warn(`(${n.ID}) ${n.Title} not found.`)
				} else {
					// Model
					console.error(`unable to delete (${n.ID}) ${n.Title}`)
				}
			}
		}
	}
}
