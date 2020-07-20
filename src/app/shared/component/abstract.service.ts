import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { HttpService } from '@shared/service/http.service';

import { AbstractModel } from '@shared/component/abstract.model';
import { FormFile } from '@shared/service/model/form-file.model';
import { HttpParams } from '@angular/common/http';

export abstract class AbstractService<T extends AbstractModel> {
	protected httpService: HttpService;
	protected baseUrl: string;
	protected convert: boolean;

	constructor(httpService: HttpService, baseUrl: string, convert: boolean = false) {
		this.httpService = httpService;
		this.baseUrl = baseUrl;
		this.convert = convert;
	}

	public getAll(): Observable<Array<T>> {
		return this.httpService.get(`/${this.baseUrl}s`).pipe(take(1));
	}

	public getById(id: string): Observable<T> {
		return this.httpService.get(`/${this.baseUrl}/${id}`).pipe(take(1));
	}

	public create(item: T): Observable<T> {
		return this.httpService.post(`/${this.baseUrl}`, item).pipe(take(1));
	}

	public createForm(item: T, files: Array<FormFile>, convert: boolean = false) {
		const formData: FormData = new FormData();

		files.forEach((formFile: FormFile) => {
			formData.append(formFile.key, formFile.file, formFile.file.name);
		});

		Object.keys(item).forEach(key => {
			formData.append(key, item[key])
		});

		return this.httpService.post(`/${this.baseUrl}`, formData, convert).pipe(take(1));
	}

	public update(item: T): Observable<T> {
		return this.httpService.put(`/${this.baseUrl}/${item._id}`, item).pipe(take(1));
	}

	public getPaginated(currentPage: number, itemsPerPage: number, sortBy?: string, sortOrder?: number): Observable<Array<T>> {
		let params = new HttpParams()
			.set('currentPage', currentPage.toString())
			.set('itemsPerPage', itemsPerPage.toString());

		if (sortBy && sortOrder) {
			params = params.set('sortBy', sortBy);
			params = params.set('sortOrder', sortOrder.toString());
		}	

		return this.httpService.get(`/${this.baseUrl}s`, this.convert, params).pipe(take(1));
	}
}