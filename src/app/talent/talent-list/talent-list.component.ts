import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { Talent } from '@shared/model/talent.model';
import { SortOptions } from '@shared/service/model/sort-options.model';

@Component({
	selector: 'talent-list',
	templateUrl: './talent-list.component.html',
	styleUrls: ['./talent-list.component.scss']
})
export class TalentListComponent extends AbstractListComponent<Talent> {

	constructor(service: TalentService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}

	public navigateToNew() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}
}