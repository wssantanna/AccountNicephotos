import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxHotjarService } from 'ngx-hotjar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	public static isBrowser = new BehaviorSubject<boolean>(null);

	constructor(
		private router: Router,
		private googleAnalyticsService: GoogleAnalyticsService,
		private hotjarService: NgxHotjarService,
		@Inject(PLATFORM_ID) platformId: any) {

		AppComponent.isBrowser.next(isPlatformBrowser(platformId));
	}

	public ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.googleAnalyticsService.pageView('GA Account Nicephotos', `Account Nicephotos: ${event.urlAfterRedirects}`);
				this.hotjarService.virtualPageView(event.urlAfterRedirects);
				this.hotjarService.trigger(event.urlAfterRedirects);
				this.hotjarService.stateChange(event.urlAfterRedirects);
			}
		});
	}
}
