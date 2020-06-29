import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Media } from '@shared/model/media.model';

@Injectable()
export class MediaService extends AbstractService<Media> {
	constructor(httpService: HttpService) {
		super(httpService, 'media');
	}

	public getMediaByTalent(id: string) {
		return this.httpService.get(`/${this.baseUrl}s/talent/${id}`);
	}

	public updateMedias(medias: Array<Media>) {
		return this.httpService.put(`/${this.baseUrl}s`, medias);
	}
}