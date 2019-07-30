import { Injectable } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal/public_api';
import { ModalContentComponent } from '../components/modal-content/modal-content.component';

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
	public show(config: ModalConfig): void {
		// Set global settings
		if (!config.global)
			config.global = {};

		// The configuration for the Bootstrap modal service.
		const modalCfg: ModalOptions = {
			keyboard: (config.global.escape != null) ?
				config.global.escape : true,
			ignoreBackdropClick: (config.global.backClick != null) ?
				config.global.backClick : false,
			initialState: config
		}

		this.bsModalSrv.show(ModalContentComponent, modalCfg);
	}
}

export interface ModalConfig {
	header: ModalHeaderConfig
	body: string
	footer: ModalFooterControlConfig[]
	global: ModalGlobalConfig
}

export interface ModalHeaderConfig {
	title?: string
	close?: boolean
}

export interface ModalFooterControlConfig {
	text: string
	fn: Function
	class?: string
	klass?: any
}

export interface ModalGlobalConfig {
	escape?: boolean
	backClick?: boolean
	size?: string
}
