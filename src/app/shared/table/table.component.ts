import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { Talent } from '@shared/model/talent.model';
import { SortOptions } from '@shared/service/model/sort-options.model';

@Component({
	selector: 'table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent {
    private _sortBy: string;
	private _sortOrder: number;

	@Input() listOfItems: any;
	@Output() sortOptions = new EventEmitter();
	@Output() navigateToNew = new EventEmitter();

	public onNavigateClick() {
		this.navigateToNew.emit();
	}

	public onSortClick(event: any) {
		if (event.target.id === this._sortBy) {
			this._sortOrder *= -1;
		} else {
			this._sortBy = event.target.id;
			this._sortOrder = 1;
		}

		const sortOptions: SortOptions = {
			sortBy: this._sortBy,
			sortOrder: this._sortOrder
		}
		
		this.sortOptions.emit(sortOptions);
	}
}