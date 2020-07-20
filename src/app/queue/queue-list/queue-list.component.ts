import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { QueueService } from '../queue.service';
import { Queue } from '@shared/model/queue.model';

@Component({
	selector: 'queue-list',
	templateUrl: './queue-list.component.html',
	styleUrls: ['./queue-list.component.scss']
})
export class QueueListComponent extends AbstractListComponent<Queue> {
	constructor(service: QueueService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}
	
	public navigateToNew() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}
}