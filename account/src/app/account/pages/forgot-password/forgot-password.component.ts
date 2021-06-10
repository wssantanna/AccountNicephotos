import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ForgotPasswordService } from '../../shared/services/forgot-password/forgot-password.service';
import { SearchEngineOptimizationService } from '../../shared/services/seo/seo.service';

@Component({
    selector: 'nice-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    public forgotPassowrd: FormGroup;

    private formMessage: string;

    public constructor(
        private forgotPasswordService: ForgotPasswordService,
        private formBuilder: FormBuilder,
        private router: Router,
        private seo: SearchEngineOptimizationService,
        private title: Title) { }

    public ngOnInit(): void {

        this.title.setTitle("Nicephotos :: Esqueceu sua senha?");

        this.seo.create({
            description: 'Faça seu cadastro ou login no Nicephotos e aproveite as promoções.',
            keywords: 'Entrar, Revelação de Fotos, Fotolivro, Nicephotos, Oi Fotos',
            robot: 'index, nofolow',
            themeColor: '#000000'
        });

        this.forgotPassowrd = this.formBuilder.group({
            email: [
                null,
                [
                    Validators.required,
                    Validators.email
                ]
            ]
        });
    }

    public checkValidAndTouchedField(fieldName): boolean {
        let field = this.forgotPassowrd.get(fieldName);
        return !field.valid && field.touched;
    }

    public isValidForm(): boolean {
        return !this.forgotPassowrd.valid;
    }

    private clearForm(): void {
        this.forgotPassowrd.reset();
    }

    public onSubmit(): void {
        try {
            this.forgotPasswordService.resetPassword(this.forgotPassowrd.value)
                .subscribe((userData: any) => {

                    this.setFormMessage(userData.message);
                    this.clearForm();

                }, (error: any) => {

                    console.log(error);
                    this.setFormMessage('Este email não está cadastrado, crie uma conta.');

                });
        } catch (error) {
            console.log(error);
            this.router.navigate['/account/autenticar'];
        }
    }

    public getFormMessage(): string {
        return this.formMessage;
    }

    private setFormMessage(value: string) {
        this.formMessage = value;
    }
}
