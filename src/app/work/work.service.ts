import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Talent } from '@shared/model/talent.model';
import { FormFile } from '@shared/service/model/form-file.model';
import { Media } from '@shared/model/media.model';

@Injectable()
export class WorkService extends AbstractService<Media> {
	constructor(httpService: HttpService) {
		super(httpService, 'media');
	}

}