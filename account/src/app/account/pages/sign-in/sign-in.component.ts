import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../shared/services/auth/auth.service';
import { SearchEngineOptimizationService } from '../../shared/services/seo/seo.service';
import { Subscription } from 'rxjs';
import { CredentialSocial } from '../../shared/models/credential-social.model';

@Component({
    selector: 'nice-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

    public signIn: FormGroup;

    private formErrorMessage: string;

    private subscribe: Subscription;
    public urlDest: string;

    public constructor(
        public authInService: AuthService,
        private formBuilder: FormBuilder,
        private router: ActivatedRoute,
        private seo: SearchEngineOptimizationService,
        private title: Title) { }

    public ngOnInit(): void {

        this.title.setTitle("Nicephotos :: Autenticação");

        this.seo.create({
            description: 'Faça seu cadastro ou login no Nicephotos e aproveite as promoções.',
            keywords: 'Entrar, Revelação de Fotos, Fotolivro, Nicephotos, Oi Fotos',
            robot: 'index, nofolow',
            themeColor: '#000000'
        });

        this.subscribe = this.router.queryParams
            .subscribe((params) => {
                this.urlDest = params['url_destino'];
            });

        this.signIn = this.formBuilder.group({
            email: [
                null,
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            senha: [
                null,
                [
                    Validators.required,
                    Validators.minLength(1)
                ]
            ]
        });

    }

    public ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    public getFormError(): string {
        return this.formErrorMessage;
    }

    private setFormError(value: string) {
        this.formErrorMessage = value;
    }

    public isValidForm(): boolean {
        return !this.signIn.valid;
    }

    private clearForm(): void {
        this.signIn.reset();
    }

    public async authenticateWithGoogle(): Promise<void> {
        try {
            const credentialSocial: CredentialSocial = await this.authInService.googleSignIn();
            if (credentialSocial && credentialSocial.providerToken) {
                const userData: any = await this.authInService.authenticateWithSocial(credentialSocial);
                this.authInService.registerUserDataInLocalStorage(JSON.stringify(userData));
                this.authInService.redirectAfterAuthentication(this.urlDest, userData.legacySessionToken);
            } else {
                throw new Error("Não foi possível conectar ao Google.");
            }
        } catch (error) {
            this.setFormError(error.message);
            this.clearForm();
        }
    }

    public async authenticateWithFacebook(): Promise<void> {
        try {
            const credentialSocial: CredentialSocial = await this.authInService.facebookSignIn();
            if (credentialSocial && credentialSocial.providerToken) {
                const userData: any = await this.authInService.authenticateWithSocial(credentialSocial);
                this.authInService.registerUserDataInLocalStorage(JSON.stringify(userData));
                this.authInService.redirectAfterAuthentication(this.urlDest, userData.legacySessionToken);
            } else {
                throw new Error("Não foi possível conectar ao Facebook.");
            }
        } catch (error) {
            this.setFormError(error.message);
            this.clearForm();
        }
    }

    public onSubmit(): void {
        try {
            this.authInService.authenticateWithEmailAndPassword(this.signIn.value)
                .subscribe((userData: any) => {
                    this.authInService.registerUserDataInLocalStorage(JSON.stringify(userData));
                    this.authInService.redirectAfterAuthentication(this.urlDest, userData.legacySessionToken);
                }, (errorData: any) => {
                    const { error } = errorData;
                    this.setFormError(error.message);
                    this.clearForm();
                });
        } catch (err) {
            console.log(err);
        }
    }
}
