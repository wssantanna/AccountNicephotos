import { Component, OnInit } from '@angular/core';
import { AppLegacy } from 'src/app/app.enviroment';

@Component({
    selector: 'nice-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    public bannerUri: string = "";

    public constructor() {
        this.setBannerUri();
    }

    public ngOnInit(): void { }

    private setBannerUri(): void {
        if (window.innerWidth < 640 || window.innerHeight < 480) {
            // m.nicephotos.com.br
            // mimp.nicephotos.com.br
            this.bannerUri = AppLegacy.BASE_URL_REDIRECT_MOBILE;
        } else {
            // www.nicephotos.com.br
            // imp.nicephotos.com.br
            this.bannerUri = AppLegacy.BASE_URL_REDIRECT_DESKTOP;
        }
    }
}
