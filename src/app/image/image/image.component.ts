import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageService } from '@image/image.service';
import { TalentService } from '@talent/talent.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Image } from '@shared/model/image.model';
import { Talent } from '@shared/model/talent.model';
import { FormFile } from '@shared/service/model/form-file.model';

import { ComboBoxConfig } from '@shared/framework/combo-box/combo-box.config';

@Component({
	selector: 'image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss']
})
export class ImageComponent extends AbstractComponent<Image> {
	private talentService: TalentService;
	private file: File;

	public originalImage: any = '';
	public croppedImage: any = '';
	public talents: Array<Talent> = new Array<Talent>();
	public comboBoxConfig: ComboBoxConfig;

	constructor(service: ImageService, activatedRoute: ActivatedRoute, router: Router, talentService: TalentService) {
		super(service, activatedRoute, router);

		this.talentService = talentService;
	}

	ngOnInit() {
		super.ngOnInit();

		this.talentService.getAll().subscribe((talents: Array<Talent>) => {
			this.comboBoxConfig = {
				targetData: this.item,
				targetKey: 'talent'
			};
			this.talents = talents;
		});
	}

	public onFileChange(event) {
		this.originalImage = event;
		this.file = event.target.files[0];
	}

	public onImageCropped(event) {
		this.croppedImage = event.base64;
	}

	public save() {
		fetch(this.croppedImage)
		.then(result => result.blob())
		.then((blob) => {
			const file: File = new File([blob], 'thumbnail', {
				type: 'image/jpeg'
			});

			console.log(file);
			console.log(this.file);
			const image: FormFile = {
				file: this.file,
				key: 'originalImage'
			};

			const thumbnail: FormFile = {
				file: file,
				key: 'thumbnailImage'
			};

			console.log(image);
			console.log(thumbnail);
			this.service.createForm(this.item, [thumbnail]).subscribe((data) => {
				console.log(data);
			});
		});
	}
}