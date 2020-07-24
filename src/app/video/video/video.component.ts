import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { VideoService } from '@video/video.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Video } from '@shared/model/video.model';
import { Talent } from '@shared/model/talent.model';
import { FormFile } from '@shared/service/model/form-file.model';

import { ComboBoxConfig } from '@shared/framework/combo-box/combo-box.config';
import { ResponseData } from '@shared/service/model/response-data.model';

@Component({
	selector: 'video-item',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss']
})
export class VideoComponent extends AbstractComponent<Video> {
	private talentService: TalentService;
	private videoFile;
	private imageFile;

	public talents: Array<Talent> = new Array<Talent>();
	public comboBoxConfig: ComboBoxConfig;

	public videoSource;

	constructor(service: VideoService, activatedRoute: ActivatedRoute, router: Router, talentService: TalentService) {
		super(service, activatedRoute, router);

		this.talentService = talentService;
	}

	ngOnInit() {
		super.ngOnInit();

		this.talentService.getAll().subscribe((data: ResponseData) => {
			this.comboBoxConfig = {
				targetData: this.item,
				targetKey: 'talent'
			};
			this.talents = data.list;
		});
	}

	public onVideoFileChange(event) {
		this.videoFile = event.target.files[0];
	}

	public onImageFileChange(event) {
		this.imageFile = event.target.files[0];
	}

	protected save() {
		const video: FormFile = {
			file: this.videoFile,
			key: 'file'
		};

		const image: FormFile = {
			file: this.imageFile,
			key: 'thumbnail'
		};

		console.log(video, image);

		this.service.createForm(this.item, [video, image], true).subscribe((data) => {
			console.log(data);
		});
	}
}