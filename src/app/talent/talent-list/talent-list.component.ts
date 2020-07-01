import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { Talent } from '@shared/model/talent.model';

@Component({
	selector: 'talent-list',
	templateUrl: './talent-list.component.html',
	styleUrls: ['./talent-list.component.scss']
})
export class TalentListComponent extends AbstractListComponent<Talent> {
	private sortBy: string = 'title';
	private sortOrder: number = 1;

	constructor(service: TalentService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}

	public navigateToNew() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}

	public onSortClick(event: any) {
		if (event.target.id === this.sortBy) {
			this.sortOrder *= -1;
		} else {
			this.sortBy = event.target.id;
			this.sortOrder = 1;
		}

		this.getSortedData(this.sortBy, this.sortOrder);
	}
}