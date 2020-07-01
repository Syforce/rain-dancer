import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractService } from '@shared/component/abstract.service';

export abstract class AbstractListComponent<T> implements OnInit {
	private abstractService: AbstractService<T>;
	protected activatedRoute: ActivatedRoute;
	protected router: Router;

	public list: Array<T> = new Array<T>();

	constructor(abstractService: AbstractService<T>, activatedRoute: ActivatedRoute, router: Router) {
		this.abstractService = abstractService;
		this.activatedRoute = activatedRoute;
		this.router = router;
	}

	ngOnInit() {
		this.abstractService.getAll().subscribe((list: Array<T>) => {
			this.list = list;
		});
	}

	public navigateToTalent(id: string) {
		this.router.navigate([id], {
			relativeTo: this.activatedRoute
		});
	}

	public getSortedData(sortBy: string, sortOrder: number) {
		this.abstractService.getSorted(sortBy, sortOrder).subscribe((list: Array<T>) => {
			this.list = list;
		});
	}
}