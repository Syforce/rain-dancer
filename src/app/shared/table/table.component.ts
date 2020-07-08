import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SortOptions } from '@shared/service/model/sort-options.model';

@Component({
	selector: 'table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent {
	private sortBy: string;
	private sortOrder: number;

	@Input() listOfItems: Array<any>;
	@Output() onSortChange = new EventEmitter();
	@Output() onNavigate = new EventEmitter();

	public onNavigateClick() {
		this.onNavigate.emit();
	}

	public onSortClick(event: any) {
		if (event.target.id === this.sortBy) {
			this.sortOrder *= -1;
		} else {
			this.sortBy = event.target.id;
			this.sortOrder = 1;
		}

		const sortOptions: SortOptions = {
			sortBy: this.sortBy,
			sortOrder: this.sortOrder
		}
		
		this.onSortChange.emit(sortOptions);
	}
}