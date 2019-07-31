import { Injectable } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../modals/modal-content/modal-content.component';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	private bsModalSrv: BsModalService

	constructor(bsModalSrv: BsModalService) {
		this.bsModalSrv = bsModalSrv;
	}

	/**
	 * Show a new modal.
	 * @param config The configuration to be applied to the modal.
	 */
	public async show(config: ModalConfig): Promise<string> {
		return new Promise((resolve, reject) => {
			// Set global settings
			if (!config.global)
				config.global = {};

			// The configuration for the Bootstrap modal service.
			const modalCfg: ModalOptions = {
				keyboard: (config.global.escape != null) ?
					config.global.escape : true,
				ignoreBackdropClick: (config.global.backClick != null) ?
					config.global.backClick : false,
				initialState: { config }
			}

			let ref = null;

			// Once the modal is displayed, run a user defined function if available.
			this.bsModalSrv.onShown.subscribe(() => {
				if (config.global.onShown)
					config.global.onShown(ref)
			});

			// Resolve the modal with the close reason.
			this.bsModalSrv.onHidden.subscribe((reason: string) => {
				resolve(reason);
			});

			// Actually show the modal.
			ref = this.bsModalSrv.show(ModalContentComponent, modalCfg);
		});
	}
}

export interface ModalConfig {
	header?: ModalHeaderConfig
	body: string
	footer?: ModalFooterControlConfig[]
	global?: ModalGlobalConfig
}

export interface ModalHeaderConfig {
	title?: string
	close?: boolean
}

export interface ModalFooterControlConfig {
	text: string
	fn: (BsModalRef)=>void
	class?: string
	klass?: any
}

export interface ModalGlobalConfig {
	escape?: boolean
	backClick?: boolean
	onShown?: (r: BsModalRef)=>void
}
