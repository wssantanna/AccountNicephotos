import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AccountComponent } from './containers/account/account.component';
import { AuthComponent } from './containers/auth/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TermsAndPrivacityComponent } from './containers/terms-and-privacity/terms-and-privacity.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'autenticar',
            },
            {
                path: 'autenticar',
                component: SignInComponent
            },
            {
                path: 'autenticar/:query',
                component: SignInComponent
            },
            {
                path: 'cadastrar',
                component: SignUpComponent
            },
            {
                path: 'recuperar-senha',
                component: ForgotPasswordComponent
            }
        ]
    },
    {
        path: '',
        component: TermsAndPrivacityComponent,
        children: [
            {
                path: 'termos',
                component: TermsComponent
            },
            {
                path: 'privacidade',
                component: PrivacyComponent
            }
        ]
    },
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: 'meus-dados',
                component: ProfileComponent
            }
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'account',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
