import { Observable } from 'rxjs';

import { HttpService } from '@shared/service/http.service';

import { AbstractModel } from '@shared/component/abstract.model';
import { FormFile } from '@shared/service/model/form-file.model';

export abstract class AbstractService<T extends AbstractModel> {
	protected httpService: HttpService;
	protected baseUrl: string;

	constructor(httpService: HttpService, baseUrl: string) {
		this.httpService = httpService;
		this.baseUrl = baseUrl;
	}

	public getAll(): Observable<Array<T>> {
		return this.httpService.get(`/${this.baseUrl}s`);
	}

	public getById(id: string): Observable<T> {
		return this.httpService.get(`/${this.baseUrl}/${id}`);
	}

	public create(item: T): Observable<T> {
		return this.httpService.post(`/${this.baseUrl}`, item);
	}

	public createForm(item: T, files: Array<FormFile>, convert: boolean = false) {
		const formData: FormData = new FormData();

		files.forEach((formFile: FormFile) => {
			formData.append(formFile.key, formFile.file, formFile.file.name);
		});

		formData.append('data', JSON.stringify(item));

		return this.httpService.post(`/${this.baseUrl}`, formData, convert);
	}

	public update(item: T): Observable<T> {
		return this.httpService.put(`/${this.baseUrl}/${item._id}`, item);
	}
}