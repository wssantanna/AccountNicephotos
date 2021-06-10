import { Component, OnInit } from '@angular/core';
import { AppLegacy } from 'src/app/app.enviroment';

@Component({
    selector: 'nice-account',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    public bannerUri: string = "";
    public homeUri: string = "";

    public constructor() {
        this.setBannerUri();
        this.setHomeUri();
    }

    public ngOnInit(): void { }

    private setBannerUri(): void {
        /*
        if (window.innerWidth < 640 || window.innerHeight < 480) {
            // m.nicephotos.com.br
            // mimp.nicephotos.com.br
            this.bannerUri = AppLegacy.BASE_URL_REDIRECT_MOBILE;
        } else {
            // www.nicephotos.com.br
            // imp.nicephotos.com.br
            this.bannerUri = AppLegacy.BASE_URL_REDIRECT_DESKTOP;
        }
        */
    }

    private setHomeUri(): void {
        /*
        if (window.innerWidth < 640 || window.innerHeight < 480) {
            // m.nicephotos.com.br
            // mimp.nicephotos.com.br
            this.homeUri = AppLegacy.BASE_URL_REDIRECT_MOBILE;
        } else {
            // www.nicephotos.com.br
            // imp.nicephotos.com.br
            this.homeUri = AppLegacy.BASE_URL_REDIRECT_DESKTOP;
        }
        */
    }
}
