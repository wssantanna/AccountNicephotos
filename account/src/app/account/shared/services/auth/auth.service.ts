import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Variaveis
import { API, AppLegacy } from 'src/app/app.enviroment';

// Services
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LegacyService } from '../legacy/legacy.service';
import { SignUpService } from '../sign-up/sign-up.service';

// Models
import { CredentialSocial } from '../../models/credential-social.model';
import { Account } from '../../models/account.model';
import { Credential } from '../../models/credential.model';

// Firebase
import firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public constructor(
		@Inject(LegacyService) private legacyService: LegacyService,
		@Inject(SignUpService) private signUpService: SignUpService,
		@Inject(LocalStorageService) private localStorage: LocalStorageService,
		private http: HttpClient,
		private afAuth: AngularFireAuth) { }

	public authenticateWithEmailAndPassword(credential: Credential): Observable<any> {
		return this.http.post<any>(API.AUTH_URL, credential);
	}

	public logout(): Observable<any> {
		return this.http.delete(API.AUTH_URL);
	}

	public registerUserDataInLocalStorage(userData: any): void {
		this.localStorage.setItem(API.LOCAL_STORAGE_KEY, userData);
	}

	public getJwtToken(): string {
		let localTokenFull = this.localStorage.getItem(API.LOCAL_STORAGE_KEY);
		if (localTokenFull) {
			try {
				return JSON.parse(localTokenFull).token;
			} catch (err) {
				return '';
			}
		} else {
			return '';
		}
	}

	public async googleSignIn(): Promise<CredentialSocial> {
		const provider = new firebase.auth.GoogleAuthProvider();
		const data: any = await firebase.auth().signInWithPopup(provider);

		return this.getUserCredentialSocial(data);
	}

	public async facebookSignIn(): Promise<CredentialSocial> {
		const provider = new firebase.auth.FacebookAuthProvider();
		const data: any = await firebase.auth().signInWithPopup(provider);

		return this.getUserCredentialSocial(data);
	}

	private getUserCredentialSocial(data: any): CredentialSocial {
		const credential = new CredentialSocial();
		credential.providerId = data.additionalUserInfo.providerId;
		credential.isNewUser = data.additionalUserInfo.isNewUser;
		credential.email = data.additionalUserInfo.profile["email"];
		credential.userName = data.additionalUserInfo.profile["name"];
		credential.providerToken = data.credential["idToken"];
		credential.fakePassword = this.createRandomPassword(credential);
		return credential;
	}

	private createRandomPassword(credential: CredentialSocial): string {
		// 3 primeiros caracteres do token do parceiro + 3 ultimos caracteres;
		return credential.providerToken.substring(0, 3) + credential.providerToken.substr(-3);
	}

	public async authenticateWithSocial(credentialSocial: CredentialSocial): Promise<any> {
		if (credentialSocial.isNewUser) {
			// Cadastrar usuário
			const signUpData = new Account();
			signUpData.email = credentialSocial.email;
			signUpData.senha = credentialSocial.fakePassword;
			signUpData.dtNascimento = "01/01/2000";
			signUpData.sexo = "masculino";
			signUpData.favorito = true;
			signUpData.receberEmail = true;
			signUpData.receberSms = true;
			signUpData.nome = credentialSocial.userName;
			signUpData.apelido = credentialSocial.userName;
			signUpData.loginExternoNomeParceiro = credentialSocial.providerId;
			signUpData.loginExternoTokenParceiro = credentialSocial.providerToken;
			signUpData.recaptcha = credentialSocial.providerToken;

			return await this.signUpService.register(signUpData).toPromise();

		} else {
			// Logar usuário
			const signInData = new Credential();
			signInData.email = credentialSocial.email;
			signInData.senha = credentialSocial.fakePassword;

			return await this.authenticateWithEmailAndPassword(signInData).toPromise();
		}
	}

	public redirectAfterAuthentication(urlDest: string, legacySessionToken: string): void {
		// Dimensões do documento
		const widthInnerWindow: number = 640;
		const heightInnerWindow: number = 480;

		if (urlDest) {
			if (window.innerWidth < widthInnerWindow || window.innerHeight < heightInnerWindow) {
				let pathUrlDestino = this.legacyService.tokenEmbedEndOfPath(legacySessionToken, urlDest);
				location.assign(`${AppLegacy.BASE_URL_REDIRECT_MOBILE}${pathUrlDestino}`);
			} else {
				let pathUrlDestino = this.legacyService.tokenEmbedWithinURI(legacySessionToken, urlDest);
				location.assign(`${AppLegacy.BASE_URL_REDIRECT_DESKTOP}${pathUrlDestino}`);
			}
		} else {
			if (window.innerWidth < widthInnerWindow || window.innerHeight < heightInnerWindow) {
				location.assign(`${AppLegacy.BASE_URL_REDIRECT_MOBILE}?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}`);
			} else {
				location.assign(`${AppLegacy.BASE_URL_REDIRECT_DESKTOP}?514970af034c449f5aaf5001ec7d90fd7a5bec39=${legacySessionToken}`);
			}
		}
	}
}
