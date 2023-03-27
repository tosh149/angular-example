import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './login/login.component';
import { UserEffect } from './state/user.effects';
import { userReducer } from './state/user.reducer';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatStepperModule} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

const userRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('user',userReducer),
    EffectsModule.forFeature([UserEffect]),
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
    // Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class UserModule { }
