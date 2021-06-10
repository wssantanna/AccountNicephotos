import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SearchEngineOptimizationService } from '../../shared/services/seo/seo.service';

@Component({
    selector: 'nice-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

    public constructor(
        private seo: SearchEngineOptimizationService,
        private title: Title) { }

    public ngOnInit(): void {

        this.title.setTitle("Nicephotos :: Política de privacidade");

        this.seo.create({
            description: 'Faça seu cadastro ou login no Nicephotos e aproveite as promoções.',
            keywords: 'Entrar, Revelação de Fotos, Fotolivro, Nicephotos, Oi Fotos',
            robot: 'index, nofolow',
            themeColor: '#000000'
        });
    }

}
