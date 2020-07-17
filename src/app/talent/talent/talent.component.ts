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
	private listingFile: File;
	private profileFile: File;

	public listingImage: any = '';
	public profileImage: any = '';
	public listingCroppedImage: any = '';
	public profileCroppedImage: any = '';
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
		if (event.target.name === 'listingImage') {
			this.listingImage = event;
			this.listingFile = event.target.files[0];
		} else {
			this.profileImage = event;
			this.profileFile = event.target.files[0];
		}
	}

	public onListingCropped(event) {
		this.listingCroppedImage = event.base64;
	}

	public onProfileCropped(event) {
		this.profileCroppedImage = event.base64;
	}

	public save() {
		fetch(this.profileCroppedImage)
		.then(result => result.blob())
		.then((blob) => {
			const file: File = new File([blob], 'profileCropped', {
				type: 'image/jpeg'
			});

			const profile: FormFile = {
				file: this.profileFile,
				key: 'profileImage'
			};

			const profileCropped: FormFile = {
				file: file,
				key: 'profileCroppedImage'
			};

			console.log(profile);
			console.log(profileCropped);

			fetch(this.listingCroppedImage)
			.then(result => result.blob())
			.then((blob) => {
				const file: File = new File([blob], 'listingCropped', {
					type: 'image/jpeg'
				});
	
				const listing: FormFile = {
					file: this.listingFile,
					key: 'listingImage'
				};
	
				const listingCropped: FormFile = {
					file: file,
					key: 'listingCroppedImage'
				};

				console.log(listing);
				console.log(listingCropped);
	
				this.service.createForm(this.item, [profile, profileCropped, listing, listingCropped]).subscribe((data) => {
					console.log(data);
				});
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