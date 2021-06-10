import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordService } from '../../shared/services/forgot-password/forgot-password.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ForgotPasswordComponent],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [ForgotPasswordService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('[Component-Check] - should create', () => {
        expect(component).toBeTruthy();
    });

    it('[Email-Check] - should check users email address is invalid', () => {
        const email = component.forgotPassowrd.controls['email'];

        expect(email.valid).toBeFalsy();

        expect(email.pristine).toBeTruthy();

        expect(email.errors['required']).toBeTruthy();

        email.setValue('abc');

        expect(email.errors['email']).toBeTruthy();
    });

    it('[Email-Check] - should check users correct email address is entered', () => {

        const email = component.forgotPassowrd.controls['email'];

        email.setValue('email@provedor.com');

        expect(email.errors).toBeNull();

    });
});
