import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Account } from '../../shared/models/account.model';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
    selector: 'nice-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public profile: FormGroup;
    public account: Account;

    public constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private title: Title) { }

    public ngOnInit(): void {

        this.title.setTitle("Nicephotos :: Meus dados");

        this.account = new Account();

        this.profile = this.formBuilder.group({
            nome: [
                this.account.nome,
                [
                    Validators.required
                ]
            ],
            email: [
                this.account.email,
                [
                    Validators.required
                ]
            ],
            apelido: [
                this.account.apelido,
                [
                    Validators.required
                ]
            ],
            cpf: [
                this.account.cpf,
                [
                    Validators.required
                ]
            ],
            sexo: [
                this.account.sexo,
                [
                    Validators.required
                ]
            ],
            dtNascimento: [
                this.account.dtNascimento,
                [
                    Validators.required
                ]
            ],
            ddd: [
                this.account.ddd,
                [
                    Validators.required
                ]
            ],
            celular: [
                this.account.celular,
                [
                    Validators.required
                ]
            ],
            receberEmail: [
                this.account.nome,
                [
                    Validators.required
                ]
            ],
            receberSms: [
                this.account.nome,
                [
                    Validators.required
                ]
            ],
            enderecos: [
                this.account.enderecos,
                [
                    Validators.required
                ]
            ],
            dadosFiscais: [
                this.account.dadosFiscais,
                [
                    Validators.required
                ]
            ],
        });
    }

    public onSubmit(): void {
        try {
            this.accountService.updateProfile(this.account)
                .subscribe(() => {
                    // Teve sucesso apresentar mensagem na tela.
                }, (error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

}
