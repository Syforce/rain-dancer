import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VideoService } from '@video/video.service';
import { AbstractListComponent } from '@shared/component/abstract-list.component';

import { Video } from '@shared/model/video.model';

@Component({
	selector: 'video-list',
	templateUrl: './video-list.component.html',
	styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent extends AbstractListComponent<Video> {
	constructor(service: VideoService, activatedRoute: ActivatedRoute, router: Router) {
		super(service, activatedRoute, router);
	}

	public navigateToNew() {
		this.router.navigate(['new'], {
			relativeTo: this.activatedRoute
		});
	}
}