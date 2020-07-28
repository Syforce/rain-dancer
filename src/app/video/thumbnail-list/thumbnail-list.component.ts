import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'thumbnail-list',
	templateUrl: './thumbnail-list.component.html',
	styleUrls: ['./thumbnail-list.component.scss']
})
export class ThumbnailListComponent {
	@Input() thumbnailsList: Array<string>;
}