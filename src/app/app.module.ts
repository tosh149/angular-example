import { FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from './components/user/user.module';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Cookie } from 'ng2-cookies/ng2-cookies';
// import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
 
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    HomeComponent,
    VarifyEmailComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'square-spin' }),
    UserModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: "NGRX Devtools",
      maxAge: 25, 
      logOnly: environment.production
     }),
    BrowserAnimationsModule
    //  
   
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [Cookie],
  bootstrap: [AppComponent],
})
export class AppModule {}
