import { Injectable } from '@angular/core';

import { HttpService } from '@shared/service/http.service';
import { AbstractService } from '@shared/component/abstract.service';

import { Talent } from '@shared/model/talent.model';
import { FormFile } from '@shared/service/model/form-file.model';

@Injectable()
export class TalentService extends AbstractService<Talent> {
	constructor(httpService: HttpService) {
		super(httpService, 'talent');
	}

	public updateTalent(talent: Talent) {
		console.log(talent);
		return this.httpService.put(`/${this.baseUrl}/talent/${talent._id}`, talent);
	}

}