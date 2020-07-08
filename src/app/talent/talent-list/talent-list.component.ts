import { Component, ViewChild } from '@angular/core';
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

	public setItemsPerPage(itemsPerPage: number) {
		this.itemsPerPage = itemsPerPage;
		this.currentPage = 1;

		this.getPaginated(this.sortBy, this.sortOrder);
	}

	public setCurrentPage(currentPage: number) {
		this.currentPage = currentPage;
		
		this.getPaginated(this.sortBy, this.sortOrder);
	}

	public setSortOptions(sortOptions: SortOptions) {
		this.sortBy = sortOptions.sortBy;
		this.sortOrder = sortOptions.sortOrder;

		this.getPaginated(this.sortBy, this.sortOrder);
	}

}