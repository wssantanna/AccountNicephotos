import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnInit } from "@angular/core";

@Injectable()
export class AppPrerender implements OnInit {

    public constructor(@Inject(DOCUMENT) private document) { }

    public ngOnInit(): void {
        this.setBaseUrl(window.location.pathname);
    }

    private setBaseUrl(pathname): void {
        const baseUrl = ["", "/account/"];
        const baseTag = this.document.getElementsByTagName('base')[0];
        if (!baseTag === null && pathname === baseUrl[pathname]) {
            baseTag.setAttribute('href', '');
        }
    }
}