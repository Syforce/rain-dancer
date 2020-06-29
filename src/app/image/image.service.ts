import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Image } from '@shared/model/image.model';

@Injectable()
export class ImageService extends AbstractService<Image> {
	constructor(httpService: HttpService) {
		super(httpService, 'image');
	}
}