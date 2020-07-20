import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'table-footer',
	templateUrl: './table-footer.component.html',
	styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {
	private currentPage: number = 1;
	private _itemsPerPage: number;
	public nrOfPages: number;
	public previousTagVisible: boolean;
	public nextTagVisible: boolean;
	public previousDotsVisible: boolean;
	public nextDotsVisible: boolean;

	@Input() set itemsPerPage(value: number) {
		this._itemsPerPage = value;
		this.currentPage = 1;
		this.getNumberOfPages();
	}
	@Input() nrOfItems: number;
	@Output() onPageChange = new EventEmitter();

	ngOnInit() {
		this.getNumberOfPages();
	}

	private getNumberOfPages() {
		this.nrOfPages = Math.ceil(this.nrOfItems / this._itemsPerPage);
	}


	public jumpTo(page: number) {
		this.currentPage = page;
		this.onPageChange.emit(this.currentPage);
		this.previousTagVisible = false;
	}

	get prevDots() {
		if (this.first < this.prev - 1) {
			return true;
		}
		return false;
	}

	get nextDots() {
		if (this.last > this.next + 1) {
			return true;
		}
		return false;
	}

	get prevTag() {
		if (this.current - this.first > 0) {
			return true;
		}
		return false;
	}

	get nextTag() {
		if (this.last - this.current > 0) {
			return true;
		}
		return false;
	}

	get first() {
		return 1;
	}

	get prev() {
		return this.currentPage - 1;
	}

	get current() {
		return this.currentPage;
	}

	get next() {
		return this.currentPage + 1;
	}

	get last() {
		return this.nrOfPages;
	}
}