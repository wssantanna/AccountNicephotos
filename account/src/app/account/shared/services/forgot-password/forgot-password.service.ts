import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from 'src/app/app.enviroment';
import { Credential } from '../../models/credential.model';

@Injectable({
	providedIn: 'root'
})
export class ForgotPasswordService {

	public constructor(private http: HttpClient) { }

	public resetPassword(credential: Credential): Observable<any> {
		return this.http.post<any>(API.FORGOT_PASSWORD_URL, credential);
	}
}
