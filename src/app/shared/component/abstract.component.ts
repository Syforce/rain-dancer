import { OnInit } from '@angular/core';

import { AbstractModel } from '@shared/component/abstract.model';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractService } from '@shared/component/abstract.service';

export abstract class AbstractComponent<T extends AbstractModel> implements OnInit {
	protected service: AbstractService<T>;
	private activatedRoute: ActivatedRoute;
	private router: Router;

	protected editModeId: string = null;
	
	public item: T = {} as T;

	constructor(abstractService: AbstractService<T>, activatedRoute: ActivatedRoute, router: Router) {
		this.service = abstractService;
		this.activatedRoute = activatedRoute;
		this.router = router;
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params) => {
			const id: string = params.id;

			if (id) {
				this.editModeId = id;
				this.getById(id);
			}
		});
	}

	public onSaveClick() {
		if (this.editModeId) {
			this.update();
		} else {
			this.save();
		}
	}

	protected save() {
		this.service.create(this.item).subscribe((item: T) => {
			this.item = item;
		});
	}

	protected update() {
		this.service.update(this.item).subscribe((item: T) => {
			this.item = item;
		});
	}

	protected setItem(item: T) {
		this.item = item ? item : <T>{};
	}

	private getById(id: string) {
		this.service.getById(id).subscribe((item: T) => {
			this.setItem(item);
		});
	}
}