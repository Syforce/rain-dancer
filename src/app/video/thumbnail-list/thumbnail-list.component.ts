import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';
import { Thumbnail } from '@shared/model/thumbnail.model';

@Component({
	selector: 'thumbnail-list',
	templateUrl: './thumbnail-list.component.html',
	styleUrls: ['./thumbnail-list.component.scss']
})
export class ThumbnailListComponent implements OnInit {
	@Input() thumbnailsList: Array<string>;

	@Output()
	public notifyClose: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	public notifyThumbnail: EventEmitter<any> = new EventEmitter<any>();

	private newThumbnailURL: any = '';
	public thumbnailsListWithSelect: Array<Thumbnail> = new Array<Thumbnail>();
	private selectedThumbnail: Thumbnail = {url: '', selected: false};

	public exitThumbnailSelection() {
		this.notifyClose.emit(false);
	}

	public selectThumbnail(item) {
		this.selectedThumbnail.selected = false;
		item.selected = true;
		this.selectedThumbnail = item;
	}

	public saveThumbnailSelection() {
		this.notifyThumbnail.emit(this.selectedThumbnail.url);
		this.exitThumbnailSelection();
	}

	ngOnInit() {
		this.thumbnailsList.forEach((thumbnail) => {
			this.thumbnailsListWithSelect.push({url: thumbnail, selected: false});
		}) 	
	}
}