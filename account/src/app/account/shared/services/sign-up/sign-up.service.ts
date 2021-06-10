import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from 'src/app/app.enviroment';
import { Account } from '../../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    public constructor(private http: HttpClient) { }

    public register(account: Account): Observable<any> {
        const accountDto: Account = Object.assign(new Account(), account);
        accountDto.dtNascimento = SignUpService.formatDateToISO(account.dtNascimento);
        return this.http.post<any>(API.REGISTER_URL, accountDto);
    }

    private static formatDateToISO(datePtFormatted: string): string {
        const datePtFormattedParts: string[] = datePtFormatted.split("/");
        let dateISO: string = datePtFormatted;
        if (datePtFormattedParts.length >= 3) {
            dateISO = "Y-M-D"
                .replace(/Y/gi, datePtFormattedParts[2])
                .replace(/M/gi, datePtFormattedParts[1])
                .replace(/D/gi, datePtFormattedParts[0]);
        }
        return dateISO;
    }
}
