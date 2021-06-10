import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LegacyService {

	public constructor() { }

	public tokenEmbedEndOfPath(legacySessionToken, urlDestino): string {
		let embedded = '';
		const urlBaseAndQuery = urlDestino.split('?');
		const BASE = 0;
		const QUERY = 1;

		if (urlDestino.indexOf('http') === -1)
		{
			let lastSep = '/';
			if (urlBaseAndQuery[BASE].slice(-1) === '/') {
				lastSep = '';
			}

			if (urlBaseAndQuery.length > 1 && urlBaseAndQuery[QUERY] && urlBaseAndQuery[QUERY].length > 0) {
				embedded = urlBaseAndQuery[BASE] + lastSep + `?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}`
					+ '&' + urlBaseAndQuery[QUERY];
			} else {
				embedded = urlBaseAndQuery[BASE] + lastSep + `?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}`;
			}
		}
		else
		{
			embedded = '/entrar' + `/?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}`
				+ '&' + 'url_destino=' + encodeURIComponent(urlDestino);
		}

		return embedded;
	}
	public tokenEmbedWithinURI(legacySessionToken, urlDestino): string {
		let embedded = '';
		const urlBaseAndQuery = urlDestino.split('?');

		if (urlBaseAndQuery.length > 1)
		{
			const BASE = 0;
			const QUERY = 1;
			let encodedParamsDestino = '';

			if (urlBaseAndQuery.length === 3) {
				// Tratando passagem de URL completa com sua propria QueryString no parametro url_destino
				if (urlBaseAndQuery[QUERY].substring(0, 12) === 'url_destino=')
				{
					const urlDestinoSegundo = urlBaseAndQuery[1] + '?' + urlBaseAndQuery[2];
					encodedParamsDestino = 'url_destino=' + encodeURIComponent(urlDestinoSegundo.substring(12));
				}
			} else {
				const urlQueryParam = urlBaseAndQuery[QUERY].split('=');
				for (let k = 0; k < urlQueryParam.length / 2; k += 2)
				{
					if (k > 0) { encodedParamsDestino += '&'; }
					encodedParamsDestino = urlQueryParam[k] + '=' + encodeURIComponent(urlQueryParam[k + 1]);
				}
			}

			embedded = urlBaseAndQuery[BASE] + `?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}` + '&' + encodedParamsDestino;
		}
		else
		{
			embedded = `?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}` + '&' + urlDestino;
		}

		return embedded;
	}
}
