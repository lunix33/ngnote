import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalConfig } from 'src/app/services/modal.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-modal-content',
	templateUrl: './modal-content.component.html',
	styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
	private sanitizer: DomSanitizer;

	public config: ModalConfig;
	public body: any;
	public ref: BsModalRef;
	public klass: any;

	constructor(ref: BsModalRef, sanitizer: DomSanitizer) {
		this.ref = ref;
		this.sanitizer = sanitizer;
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

		this.body = this.sanitizer.bypassSecurityTrustHtml(this.config.body);
	}

}
