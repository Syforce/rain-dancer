import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageService } from '@image/image.service';
import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { Image } from '@shared/model/image.model';

@Component({
	selector: 'image-list',
	templateUrl: './image-list.component.html',
	styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends AbstractListComponent<Image> {
	public previewImage;

	constructor(service: ImageService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}

	public showPreviewImage(image: Image) {
		this.previewImage = image;
		console.log(image);
	}

	public navigateToNew() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}
}