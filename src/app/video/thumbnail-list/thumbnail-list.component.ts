import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

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

	public exitThumbnailSelection() {
		this.notifyClose.emit(false);
	}

	public selectThumbnail(event) {
		console.log(event.target.getAttribute('src'));
		this.newThumbnailURL = event.target.getAttribute('src');
	}

	public saveThumbnailSelection() {
		this.notifyThumbnail.emit(this.newThumbnailURL);
		console.log(this.newThumbnailURL);
		this.exitThumbnailSelection();
	}

	ngOnInit() {
	
	}
}