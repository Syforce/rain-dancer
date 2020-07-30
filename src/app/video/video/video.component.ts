import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TalentService } from '@talent/talent.service';
import { VideoService } from '@video/video.service';
import { AbstractComponent } from '@shared/component/abstract.component';

import { Video } from '@shared/model/video.model';
import { Talent } from '@shared/model/talent.model';
import { FormFile } from '@shared/service/model/form-file.model';

import { ComboBoxConfig } from '@shared/framework/combo-box/combo-box.config';
import { ResponseData } from '@shared/service/model/response-data.model';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { Observable } from 'rxjs';

const CONVERTION_LEVERAGE = 10;

@Component({
	selector: 'video-item',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss']
})
export class VideoComponent extends AbstractComponent<Video> {
	private talentService: TalentService;
	private videoFile: File;
	private imageFile: File;
	private imageURL: string;
	private thumbnailIsURL: boolean = true;

	public talents: Array<Talent> = new Array<Talent>();
	public comboBoxConfig: ComboBoxConfig;

	public value: number = 0;
	public highValue: number = 0;
	public options: Options = {
		floor: 0,
		ceil: 100,
		step: 1,
		translate: (value) => {
			const minutes = Math.floor(value / 600);
			const seconds = Math.floor(value % 600 / 10);
			const miliseconds = value % 10;

			const minutesStr = `${minutes}`;
			const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
			const milisecondsStr = `${miliseconds}0`;

			return `${minutesStr}:${secondsStr}:${milisecondsStr}`;
		}
	};

	@ViewChild('videoPlayer', {static: false}) videoPlayer: ElementRef;

	public thumbnailListVisible: boolean = false;
	public thumbnailSrc: string = "";

	@Output()
	public notifyOverlay: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(service: VideoService, activatedRoute: ActivatedRoute, router: Router, talentService: TalentService) {
		super(service, activatedRoute, router);

		this.talentService = talentService;
	}

	ngOnInit() {
		super.ngOnInit();

		this.talentService.getAll().subscribe((data: ResponseData) => {
			this.talents = data.list;
			this.thumbnailSrc = this.item.selectedThumbnail;
			this.imageURL = this.item.selectedThumbnail;
		});
	}

	protected initCreate() {
		this.comboBoxConfig = {
			targetData: this.item,
			targetKey: 'talent'
		};
	}

	public onVideoFileChange(event) {
		this.videoFile = event.target.files[0];
	}

	public onImageFileChange(event) {
		this.imageFile = event.target.files[0];
		this.thumbnailIsURL = false;
	}

	protected save() {
		const file: FormFile = {
			file: this.videoFile,
			key: 'file'
		};

		const thumbnail: FormFile = {
			file: this.imageFile,
			key: 'thumbnail'
		};
		
		this.service.createForm(this.item, [file, thumbnail], true).subscribe((data) => {
		});
	}

	protected update() {

		const thumbnailImage: FormFile = {
			file: this.imageFile,
			key: 'thumbnailImageFile'
		};

		if (this.thumbnailIsURL) {
			this.item.selectedThumbnail = this.imageURL;
		}
		delete this.item.thumbnails;

		this.service.updateForm(this.item, [thumbnailImage], false).subscribe((data) => {
	
		});
	}


	public showThumbnailSelection() {
		this.thumbnailListVisible = true;
	}

	public closeThumbnailSelection(event) {
		this.thumbnailListVisible = event;
	}

	public changeThumbnail(event) {
		this.thumbnailSrc = event;
		this.imageURL = event;
		this.thumbnailIsURL = true;
	}


	public onDataLoaded(event) {
		const duration = event.target.duration;
		const newOptions: Options = Object.assign({}, this.options);

		newOptions.ceil = +(duration * CONVERTION_LEVERAGE).toFixed(0);
		this.highValue = newOptions.ceil;
		this.options = newOptions;
	}

	public onUserChange(changeContext: ChangeContext) {
		this.videoPlayer.nativeElement.pause();
		changeContext.pointerType === PointerType.Min ?
			this.videoPlayer.nativeElement.currentTime = changeContext.value / CONVERTION_LEVERAGE :
			this.videoPlayer.nativeElement.currentTime = changeContext.highValue / CONVERTION_LEVERAGE;
	}

	public onPlayClick() {
		this.videoPlayer.nativeElement.currentTime = this.value / CONVERTION_LEVERAGE;
	}

	public onTimeUpdate() {
		if (this.videoPlayer.nativeElement.currentTime >= this.highValue / CONVERTION_LEVERAGE) {
			this.videoPlayer.nativeElement.pause();
		}
	}

	protected getById(id: string) {
		const observable: Observable<Video> = super.getById(id);
		observable.subscribe((item: Video) => {
			this.comboBoxConfig = {
				targetData: this.item,
				targetKey: 'talent'
			};
		});

		return observable;
	}

	public checkButtonStatus() {
		return !(this.videoFile && this.imageFile);
	}
}