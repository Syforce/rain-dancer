import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { MediaService } from '@media/media.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Talent } from '@shared/model/talent.model';
import { Media } from '@shared/model/media.model';
import { FormFile } from '@shared/service/model/form-file.model';

import * as ClassicEditor from 'asdasd123qwe';

@Component({
	selector: 'talent',
	templateUrl: './talent.component.html',
	styleUrls: ['./talent.component.scss']
})
export class TalentComponent extends AbstractComponent<Talent> {
	private mediaService: MediaService;
	private listingFile: File;
	private profileFile: File;

	public listingImage: any = '';
	public profileImage: any = '';
	public listingCroppedImage: any = '';
	public profileCroppedImage: any = '';
	public medias: Array<Media> = new Array<Media>();

	public Editor = ClassicEditor;

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

	public onListingChange(event) {
		this.listingImage = event;
		this.listingFile = event.target.files[0];
	}

	public onProfileChange(event) {
		this.profileImage = event;
		this.profileFile = event.target.files[0];
	}

	public onListingCropped(event) {
		this.listingCroppedImage = event.base64;
	}

	public onProfileCropped(event) {
		this.profileCroppedImage = event.base64;
	}

	private getImageFile(image, name) {
		return fetch(image)
		.then(blob => blob.blob())
		.then((blob) => {
			
			return new File([blob], name, {
				type: 'image/jpeg'
			});
		});
	}

	public save() {
		const profilePromise = this.getImageFile(this.profileCroppedImage, 'profileCropped');
		const listingPromise = this.getImageFile(this.listingCroppedImage, 'listingCropped');

		Promise.all([profilePromise, listingPromise]).then((values) => {
			console.log(values)
			const profile: FormFile = {
				file: this.profileFile,
				key: 'profileImage'
			};

			const profileCropped: FormFile = {
				file: values[0],
				key: 'profileCroppedImage'
			};

			const listing: FormFile = {
				file: this.listingFile,
				key: 'listingImage'
			};

			const listingCropped: FormFile = {
				file: values[1],
				key: 'listingCroppedImage'
			};

			this.service.createForm(this.item, [profile, profileCropped, listing, listingCropped]).subscribe((data) => {
				console.log(data);
			});
			
		});	
	}

	public update() {
		super.update();

		this.mediaService.updateMedias(this.medias).subscribe((data) => {
			console.log(data);
		});
	}
}