import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';
import { Thumbnail } from '@shared/model/thumbnail.model';

@Component({
	selector: 'thumbnail-list',
	templateUrl: './thumbnail-list.component.html',
	styleUrls: ['./thumbnail-list.component.scss']
})
export class ThumbnailListComponent implements OnInit {
	@Input() 
	public thumbnailsList: Array<string>;
	@Output()
	public close: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public sendThumbnail: EventEmitter<any> = new EventEmitter<any>();
	public thumbnailsListWithSelect: Array<Thumbnail> = new Array<Thumbnail>();


	private newThumbnailURL: any = '';
	private selectedThumbnail: Thumbnail = {url: '', selected: false};

	public exitThumbnailSelection() {
		this.close.emit(false);
	}

	public selectThumbnail(item) {
		this.selectedThumbnail.selected = false;
		item.selected = true;
		this.selectedThumbnail = item;
	}

	public saveThumbnailSelection() {
		this.sendThumbnail.emit(this.selectedThumbnail.url);
		this.exitThumbnailSelection();
	}

	ngOnInit() {
		this.thumbnailsList.forEach((thumbnail) => {
			this.thumbnailsListWithSelect.push({url: thumbnail, selected: false});
		}) 	
	}
}