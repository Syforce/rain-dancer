import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { WorkService } from '../work.service';
import { Media } from '@shared/model/media.model';
import { MediaService } from '@media/media.service';
import { TalentService } from '@talent/talent.service';

@Component({
	selector: 'work-list',
	templateUrl: './work-list.component.html',
	styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent extends AbstractListComponent<Media> {

	constructor(service: MediaService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}
}