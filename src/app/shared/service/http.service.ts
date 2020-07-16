import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const BASE_URL: string = `${environment.http}/api`;
const CONVERT_URL: string = `${environment.convert}/api`;

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	private httpClient: HttpClient;

	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	public get(url, params?): Observable<any> {
		return this.httpClient.get(`${BASE_URL}${url}`, {params});
	}

	public post(url, data, convert: boolean = false): Observable<any> {
		const domain: string = convert ? CONVERT_URL : BASE_URL;

		return this.httpClient.post(`${domain}${url}`, data);
	}

	public put(url, data): Observable<any> {
		return this.httpClient.put(`${BASE_URL}${url}`, data);
	}

	public delete(url): Observable<any> {
		return this.httpClient.delete(`${BASE_URL}${url}`);
	}
}