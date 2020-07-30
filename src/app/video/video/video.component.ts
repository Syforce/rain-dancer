import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
			}
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
		
		observable.subscribe(() => {
			this.comboBoxConfig = {
				targetData: this.item,
				targetKey: 'talent'
			};
		});

		return observable;
	}

	protected update() {
		const observable: Observable<Video> = super.update();

		observable.subscribe(() => {
			this.comboBoxConfig = {
				targetData: this.item,
				targetKey: 'talent'
			}
		});

		return observable;
	}
}