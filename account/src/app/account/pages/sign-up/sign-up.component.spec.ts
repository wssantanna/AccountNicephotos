import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SignUpComponent } from './sign-up.component';
import { SignUpService } from '../../shared/services/sign-up/sign-up.service';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignUpComponent],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [SignUpService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('[Component-Check] - should create', () => {
        expect(component).toBeTruthy();
    });

    it('[Email-Check] - should check users email address is invalid', () => {
        const email = component.signUp.controls['email'];

        expect(email.valid).toBeFalsy();

        expect(email.pristine).toBeTruthy();

        expect(email.errors['required']).toBeTruthy();

        email.setValue('abc');

        expect(email.errors['email']).toBeTruthy();
    });

    it('[Email-Check] - should check users correct email address is entered', () => {

        const email = component.signUp.controls['email'];

        email.setValue('email@provedor.com');

        expect(email.errors).toBeNull();

    });

    it('[Password-Check] - should check password errors', () => {

        const password = component.signUp.controls['senha'];

        expect(password.errors['required']).toBeTruthy();

        password.setValue('1234');

        expect(password.errors['minlength']).toBeTruthy();

    });


    it('[Birthday-Check] - should check date correct format', () => {

    });


    it('[Recptcha-Check] - should check recaptcha returns the token', () => {

    });

    it('[Form-Check] - should check form is valid or not if no values endered', () => {

        const form = component.signUp;

        expect(form.valid).toBeFalsy();

    });

    it('[Form-Check] - should check form is valid', () => {

    });
});
