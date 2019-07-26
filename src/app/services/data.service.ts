import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private data = new Map<string, any>();

	constructor() { }

	/**
	 * Add data in the structure.
	 * @param d The data to add in the structure.
	 * @returns The id of the data in the structure.
	 */
	public set(d: any): string {
		const id: string = uuid.v4()
		this.data.set(id, d);
		return id;
	}

	/**
	 * Get data with an id and keep it in the structure.
	 * @param id The id of the element to get.
	 * @returns The data identified by the id in the structure.
	 */
	public get(id: string): any {
		return this.data.get(id);
	}

	/**
	 * Get data with an id, but also remove it from the stored structure.
	 * @param id The id of the element to get and remove.
	 * @returns The data identified by the id in the structure.
	 */
	public pop(id: string): any {
		const data = this.data.get(id);
		this.data.delete(id);
		return data
	}
}
