import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { ModalConfig } from 'src/app/services/modal.service';

@Component({
	selector: 'app-modal-content',
	templateUrl: './modal-content.component.html',
	styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

	public config: ModalConfig;
	public ref: BsModalRef;
	public klass: any;

	constructor(ref: BsModalRef) {
		this.ref = ref;
	}

	ngOnInit() {
		// Default header settings.
		if (this.config.header) {
			if (!this.config.header.title)
				this.config.header.title = "Message";
			if (this.config.header.close == null)
				this.config.header.close = true;
		}

		// Default for footer controls.
		if (!this.config.footer)
			this.config.footer = [];
		this.config.footer.forEach(x => {
			x.klass = { "btn": true };
			if (x.class)
				x.klass[x.class] = true
			else
				x.klass["btn-sm btn-primary"] = true
		});

		// Global default.
		this.klass = { "modal-dialog": true };
		if (this.config.global.size)
			this.klass[`modal-${this.config.global.size}`] = true;
	}

}
