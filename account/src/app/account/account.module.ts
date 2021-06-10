import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

// Modules
import { AccountRoutingModule } from './account-routing.module';

// Components
import { AccountComponent } from './containers/account/account.component';
import { AuthComponent } from './containers/auth/auth.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TermsAndPrivacityComponent } from './containers/terms-and-privacity/terms-and-privacity.component';
import { TermsComponent } from './pages/terms/terms.component';

// Services
import { AuthService } from './shared/services/auth/auth.service';
import { ForgotPasswordService } from './shared/services/forgot-password/forgot-password.service';
import { SignUpService } from './shared/services/sign-up/sign-up.service';
import { SearchEngineOptimizationService } from './shared/services/seo/seo.service';
import { AccountService } from './shared/services/account/account.service';

// Interceptors
import { LegacyService } from './shared/services/legacy/legacy.service';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { Firebase } from '../app.enviroment';

@NgModule({
    declarations: [
        AccountComponent,
        AuthComponent,
        BannerComponent,
        ForgotPasswordComponent,
        SignInComponent,
        SignUpComponent,
        PrivacyComponent,
        ProfileComponent,
        TermsAndPrivacityComponent,
        TermsComponent,
    ],
    imports: [
        AccountRoutingModule,
        AngularFireModule.initializeApp(Firebase.CONFIG),
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        RouterModule
    ],
    providers: [
        AccountService,
        AuthService,
        ForgotPasswordService,
        SignUpService,
        LegacyService,
        SearchEngineOptimizationService,
    ],
})
export class AccountModule { }
