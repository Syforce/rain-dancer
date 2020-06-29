import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Video } from '@shared/model/video.model';
import { FormFile } from '@shared/service/model/form-file.model';

@Injectable()
export class VideoService extends AbstractService<Video> {
	constructor(httpService: HttpService) {
		super(httpService, 'video');
	}

	public createForm(item: Video, files: Array<FormFile>, convert: boolean = false) {

		return super.createForm(item, files, convert);
	}
}