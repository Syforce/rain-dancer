import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractService } from '@shared/component/abstract.service';
import { SortOptions } from '@shared/service/model/sort-options.model';

export abstract class AbstractListComponent<T> implements OnInit {
	private abstractService: AbstractService<T>;
	protected activatedRoute: ActivatedRoute;
	protected router: Router;

	public list: Array<T> = new Array<T>();
	public itemsPerPage: number = 5; 
	public currentPage: number = 1;
	public nrOfItems: number;
	public sortBy: string = '';
	public sortOrder: number = 1;

	constructor(abstractService: AbstractService<T>, activatedRoute: ActivatedRoute, router: Router) {
		this.abstractService = abstractService;
		this.activatedRoute = activatedRoute;
		this.router = router;
	}

	ngOnInit() {
		this.abstractService.getPaginated(this.currentPage, this.itemsPerPage).subscribe((responseData: any) => {
			this.list = responseData.list;
			this.nrOfItems = responseData.total;
		});
	}

	public navigateToTalent(id: string) {
		this.router.navigate([id], {
			relativeTo: this.activatedRoute
		});
	}

	public getPaginated(sortBy: string, sortOrder: number) {
		this.abstractService.getPaginated(this.currentPage, this.itemsPerPage, sortBy, sortOrder).subscribe((responseData: any) => {
			this.list = responseData.list;
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