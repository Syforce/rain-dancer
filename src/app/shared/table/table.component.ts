import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { SortOptions } from '@shared/service/model/sort-options.model';
import { Image } from '@shared/model/image.model';

@Component({
	selector: 'table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	private sortBy: string;
	private sortOrder: number;

	@Input() listOfItems: Array<any>;
	@Output() onSortChange = new EventEmitter();
	@Output() onNavigate = new EventEmitter();

	public dataType: string;
	public previewImage;
	
	ngOnInit() {
		// TO DO: CHANGE THIS
		const item: any = this.listOfItems[0];
		if (item.__t) {
			this.dataType = item.__t;
		} else if(item.talent) {
			this.dataType = "Queue";
		} else {
			this.dataType = "Talent";
		}
		console.log(this.dataType);
	}

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

	public showPreviewImage(image: Image) {
		this.previewImage = this.previewImage === image ? undefined : image;
	}
}