import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgxHotjarModule, NgxHotjarRouterModule } from 'ngx-hotjar';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Helpers
import { AppPrerender } from './app.prerender';

// Enviroments
import { Google, Hotjar } from './app.enviroment';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
		NgxHotjarModule.forRoot(Hotjar.TRACKING_CODE),
		NgxHotjarRouterModule,
		NgxGoogleAnalyticsModule.forRoot(Google.TRACKING_CODE),
		NgxGoogleAnalyticsRouterModule
	],
	providers: [AppPrerender],
	bootstrap: [AppComponent]
})
export class AppModule { }
