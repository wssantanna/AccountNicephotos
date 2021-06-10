import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Google } from 'src/app/app.enviroment';

// Models
import { CredentialSocial } from '../../shared/models/credential-social.model';

// Services
import { AuthService } from '../../shared/services/auth/auth.service';
import { SearchEngineOptimizationService } from '../../shared/services/seo/seo.service';
import { SignUpService } from '../../shared/services/sign-up/sign-up.service';

@Component({
    selector: 'nice-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    public signUp: FormGroup;
    public siteKey: string;

    private formErrorMessage: string;

    private subscribe: Subscription;
    public urlDest: string;

    public constructor(
        @Inject(DOCUMENT) private document,
        @Inject(AuthService) private authInService: AuthService,
        @Inject(SignUpService) private signUpService: SignUpService,
        private renderer: Renderer2,
        private formBuilder: FormBuilder,
        private router: ActivatedRoute,
        private seo: SearchEngineOptimizationService,
        private title: Title) { }

    public ngOnInit(): void {

        this.title.setTitle("Nicephotos :: Cadastrar");

        this.seo.create({
            description: 'Faça seu cadastro ou login no Nicephotos e aproveite as promoções.',
            keywords: 'Entrar, Revelação de Fotos, Fotolivro, Nicephotos, Oi Fotos',
            robot: 'index, nofolow',
            themeColor: '#000000'
        });

        this.siteKey = Google.RECAPTCHA_KEY;

        this.router.queryParams
            .subscribe((params) => {
                this.urlDest = params['url_destino'];
            });

        this.subscribe = this.router.queryParams
            .subscribe((params) => {
                this.urlDest = params['url_destino'];
            });

        this.signUp = this.formBuilder.group({
            nome: [
                null,
                [
                    Validators.required
                ]
            ],
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
                    Validators.minLength(6)
                ]
            ],
            dtNascimento: [
                null,
                [
                    Validators.required,
                    Validators.pattern("^[0-9]{2}/[0-9]{2}/[0-9]{4}$"),
                    Validators.minLength(10),
                    Validators.maxLength(10)
                ]
            ],
            recaptcha: [
                null,
                [
                    Validators.required
                ]
            ],
            receberEmail: [
                true,
                [
                    Validators.required
                ]
            ],
            receberSms: [
                true,
                [
                    Validators.required
                ]
            ]
        });

        this.appendRecaptchaScriptInTheDocument(this.document, this.renderer);
    }

    public ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    public checkValidAndTouchedField(fieldName: string): boolean {
        let field = this.signUp.get(fieldName);

        return !field.valid && field.touched;
    }

    public getFormError(): string {
        return this.formErrorMessage;
    }

    private setFormError(value: string) {
        this.formErrorMessage = value;
    }

    public isValidForm(): boolean {
        return !this.signUp.valid;
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
        }
    }

    public onSubmit(): void {
        try {
            this.signUpService.register(this.signUp.value)
                .subscribe((userData: any) => {
                    this.authInService.redirectAfterAuthentication(this.urlDest, userData.legacySessionToken);
                }, (errorData: any) => {
                    const { error } = errorData;
                    this.setFormError(error.message);
                });
        } catch (error) {
            console.log(error);
        }
    }

    // Recaptcha 
    public getTokenRecaptcha(response: string): string {
        return response;
    }

    private appendRecaptchaScriptInTheDocument(document: any, renderer: Renderer2): void {
        const body = document.body;
        const script = renderer.createElement('script');
        const urlScriptRecaptcha = 'https://www.google.com/recaptcha/api.js';

        script.defer = true;
        script.async = true;
        script.src = urlScriptRecaptcha;

        renderer.appendChild(body, script);
    }

    // Formatar campo para a máscara "DD/MM/YYYY"
    // Manter a posição do cursor
    public formatDateToPt(event: KeyboardEvent): void {
        const foiNumero = /[0-9]+/.test(event.key);
        if (!foiNumero &&
            !(event.key === 'Backspace' || event.key === 'Delete')) {
            event.preventDefault();
        }

        const dataBrasilValida = (dataValidar: string): boolean => {
            const [dia, mes, ano] = dataValidar.split('/').map(i => Number(i));
            const diasDoMes = { 1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
            const bissexto = ((ano % 4 === 0) && ((ano % 100 !== 0) || (ano % 400 === 0)));
            let valido = true;
            if (mes < 1 || mes > 12) valido = false;
            if (dia < 1 || dia > diasDoMes[mes]) valido = false;
            if (!bissexto && mes === 2 && dia === 29) valido = false;
            if (ano < 1900 || ano > (new Date()).getFullYear()) valido = false;
            return valido;
        };

        let dataFormatar: any = event.target;
        const digitos = typeof dataFormatar.value === 'undefined' ? 0 : dataFormatar.value.length;
        switch (digitos) {
            case 2:  // ex: 25
            case 5:  // ex: 25/12
                dataFormatar.value += '/';
                break;
            case 9:  // ex: 99/99/9999
                if (!dataBrasilValida(dataFormatar.value + event.key)) {
                    dataFormatar.value = '';
                    event.preventDefault();
                }
                break;
            case 10:  // ex: 25/12/2020
                event.preventDefault();
                break;
        }
    }

}
