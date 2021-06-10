import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../shared/services/auth/auth.service';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignInComponent],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [AuthService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('[Component-Check] - should create', () => {
        expect(component).toBeTruthy();
    });

    it('[Email-Check] - should check users email address is invalid', () => {
        const email = component.signIn.controls['email'];

        expect(email.valid).toBeFalsy();

        expect(email.pristine).toBeTruthy();

        expect(email.errors['required']).toBeTruthy();

        email.setValue('abc');

        expect(email.errors['email']).toBeTruthy();
    });

    it('[Email-Check] - should check users correct email address is entered', () => {

        const email = component.signIn.controls['email'];

        email.setValue('email@provedor.com');

        expect(email.errors).toBeNull();

    });

    it('[Password-Check] - should check password errors', () => {

        const password = component.signIn.controls['senha'];

        expect(password.errors['required']).toBeTruthy();

        password.setValue('1234');

        expect(password.errors['minlength']).toBeTruthy();

    });

    it('[Form-Check] - should check form is valid or not if no values endered', () => {

        const form = component.signIn;

        expect(form.valid).toBeFalsy();

    });

    /*
    it('[Form-Check] - should check form is valid or not when values entered', () => {

        const form = component.signIn;
        const email = component.signIn.controls['email'];
        const password = component.signIn.controls['senha'];

        email.setValue('email@provedor.com.br');
        password.setValue('123456');

        expect(form.valid).toBeTruthy();
    });
    */
});
