import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { MediaService } from '@media/media.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Talent } from '@shared/model/talent.model';
import { Media } from '@shared/model/media.model';
import { FormFile } from '@shared/service/model/form-file.model';

@Component({
	selector: 'talent',
	templateUrl: './talent.component.html',
	styleUrls: ['./talent.component.scss']
})
export class TalentComponent extends AbstractComponent<Talent> {
	private mediaService: MediaService;
	private file;

	public originalImage: any = '';
	public medias: Array<Media> = new Array<Media>();

	constructor(service: TalentService, activatedRoute: ActivatedRoute, router: Router, mediaService: MediaService) {
		super(service, activatedRoute, router)

		this.mediaService = mediaService;
	}

	ngOnInit() {
		super.ngOnInit();

		if (this.editModeId) {
			this.mediaService.getMediaByTalent(this.editModeId).subscribe((medias: Array<Media>) => {
				this.medias = medias;
			});
		}
	}

	public onFileChange(event) {
		const reader = new FileReader();

		this.file = event.target.files[0];
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = () => {
			this.originalImage = reader.result;
		}
	}

	public save() {
		const image: FormFile = {
			file: this.file,
			key: 'storeImage'
		};

		this.service.createForm(this.item, [image]).subscribe((data) => {
			console.log(data);
		});
	}

	public update() {
		super.update();

		this.mediaService.updateMedias(this.medias).subscribe((data) => {
			console.log(data);
		});
	}
}