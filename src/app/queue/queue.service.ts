import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Queue } from '@shared/model/queue.model';

@Injectable()
export class QueueService extends AbstractService<Queue> {
	constructor(httpService: HttpService) {
		super(httpService, 'queue', true);
	}
}