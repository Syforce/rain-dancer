import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { MediaService } from '@media/media.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Talent } from '@shared/model/talent.model';
import { Media } from '@shared/model/media.model';
import { FormFile } from '@shared/service/model/form-file.model';

import * as ClassicEditor from 'asdasd123qwe';
import { ThrowStmt } from '@angular/compiler';

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
	public originalMedias: Array<Media> = new Array<Media>();

	public Editor = ClassicEditor;

	private startCroppingListingImage: number = -1;
	private startCroppingProfileImage: number = -1;
	private listingURL: boolean = true;
	private profileURL: boolean = true;

	constructor(service: TalentService, activatedRoute: ActivatedRoute, router: Router, mediaService: MediaService) {
		super(service, activatedRoute, router)
		this.mediaService = mediaService;
	}

	ngOnInit() {
		super.ngOnInit();
		if (this.editModeId) {
			this.service.getById(this.editModeId).subscribe((talent: Talent) => {
				this.listingImage = talent.listingImage;
				this.profileImage = talent.profileImage;
				this.listingCroppedImage = talent.listingCroppedImage;
				this.profileCroppedImage = talent.profileCroppedImage;
			})
			this.mediaService.getMediaByTalent(this.editModeId).subscribe((medias: Array<Media>) => {
				this.medias = medias;
				this.originalMedias = JSON.parse(JSON.stringify(medias));
			});
		}
	}

	public onListingChange(event) {
		this.listingImage = event;
		this.listingFile = event.target.files[0];
		this.listingURL = false;
	}

	public onProfileChange(event) {
		this.profileImage = event;
		this.profileFile = event.target.files[0];
		this.profileURL = false;
	}

	public onListingCropped(event) {
		if (this.startCroppingListingImage > 0) {
			this.listingCroppedImage = event.base64;
		}	
	}

	public onProfileCropped(event) {
		if (this.startCroppingProfileImage > 0) {
			this.profileCroppedImage = event.base64;
		}
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

	private getModifiedMedias() {
		const mediasToUpdate: Array<Media> = new Array<Media>();
		for (let i = 0; i < this.medias.length; i++) {
			if (this.medias[i].published !== this.originalMedias[i].published) {
				mediasToUpdate.push(this.medias[i]);
			}
		}
		return mediasToUpdate;
	}

	public onListingCropperChange() {
		this.startCroppingListingImage++;
	}

	public onProfileCropperChange() {
		this.startCroppingProfileImage++;
	}

	private updateOnlyDetailsAndMedia() {
		super.update();
		const mediasToUpdate = this.getModifiedMedias();
		this.mediaService.updateMedias(mediasToUpdate).subscribe((data) => {});
	}

	private takeCroppedFromURL(croppedImage, customKey,  result) {
		const croppedPromise = this.getImageFile(croppedImage, 'imageCropped.jpg');
		
		return Promise.all([croppedPromise]).then((values) => {
			const imageCropped: FormFile = {
				file: values[0],
				key: customKey + 'CroppedImage'
			};
			result.push(imageCropped);
		});
	}

	private takeImageAndCroppedImageFromPC(imageFile, imageCropped, customKey,  result) {
		const imagePromise =  this.getImageFile(imageCropped, 'imageCropper.jpg');

		return Promise.all([imagePromise]).then((values) => {
			const image: FormFile = {
				file: imageFile,
				key: customKey + 'Image'
			};

			const imageCropped: FormFile = {
				file: values[0],
				key: customKey + 'CroppedImage'
			};

			Promise.resolve([image, imageCropped]).then((values) => {
				result.push(values[0]);
				result.push(values[1]);
			});
			
		});
	}


	public async update() {
		let listingImages: Array<any> = new Array<any>();
		let profileImages: Array<any> = new Array<any>();

		if (!(this.startCroppingListingImage > 0) && !(this.startCroppingProfileImage > 0)) {
			this.updateOnlyDetailsAndMedia();

		} else {

			if (!this.listingURL) {
				await this.takeImageAndCroppedImageFromPC(this.listingFile, this.listingCroppedImage, 'listing', listingImages);
			} else {
				const fileURL = {
					file: this.listingImage,
					key: 'listingImageURL'
				}
				listingImages.push(fileURL);

				if (!(this.startCroppingListingImage > 0)) {
					const croppedURL = {
						file: this.listingCroppedImage,
						key: 'listingCroppedURL'
					}
					listingImages.push(croppedURL);
				} else {
					await this.takeCroppedFromURL(this.listingCroppedImage, 'listing', listingImages);
				}
			}
	
			if (!this.profileURL) {
				await this.takeImageAndCroppedImageFromPC(this.profileFile, this.profileCroppedImage, 'profile', profileImages);
			} else {
				const fileURL = {
					file: this.profileImage,
					key: 'profileImageURL'
				}
				profileImages.push(fileURL);
				
				if (!(this.startCroppingProfileImage > 0)) {
					const croppedURL = {
						file: this.profileCroppedImage,
						key: 'profileCroppedURL'
					}
					profileImages.push(croppedURL);
				} else {
					await this.takeCroppedFromURL(this.profileCroppedImage, 'profile', profileImages);
				}
			}

			this.item['medias'] = this.getModifiedMedias();
			this.service.updateForm(this.item, [profileImages[0], profileImages[1], listingImages[0], listingImages[1]]).subscribe((data) => {});
		}
	}

	public checkButtonStatus() {
		return !(this.listingImage && this.profileImage);
	}
}