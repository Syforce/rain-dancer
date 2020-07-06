import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
	selector: 'table-footer',
	templateUrl: './table-footer.component.html',
	styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {
	private _currentPage: number = 1;
	private _itemsPerPage: number;
	public nrOfPages: number;

	@Input() set itemsPerPage(value) {
		this._itemsPerPage = value;
		this.getNumberOfPages();
	}
	@Input() nrOfItems: number;
	@Output() page = new EventEmitter();

	ngOnInit() {
		this.getNumberOfPages();
	}

	private getNumberOfPages() {
		this.nrOfItems = Number(this.nrOfItems);
		this._itemsPerPage = Number(this._itemsPerPage);

		if (this.nrOfItems <= this._itemsPerPage) {
			this.nrOfPages = 1;
		}
		else {
			const res: number = this.nrOfItems / this._itemsPerPage;
			if (res > parseInt(res.toString())) {
				this.nrOfPages = parseInt((res + 1).toString());
			}
			else {
				this.nrOfPages = parseInt((res).toString());
			}
		}
	}

	public jumpTo(page: number) {
		this._currentPage = page;
		this.page.emit(this._currentPage);
	}

	get first() {
		return 1;
	}

	get prev() {
		return this._currentPage - 1;
	}

	get current() {
		return this._currentPage;
	}

	get next() {
		return this._currentPage + 1;
	}

	get last() {
		return this.nrOfPages;
	}
}