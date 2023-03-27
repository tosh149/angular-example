import { AuthService } from '../../../service/auth.service';
import { Component, Injectable, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import { getCurrentUser, UState } from '../state/user.reducer';
import { UserLoginActions } from '../state/actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { Cookie} from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  
  user: User = {
    name: '',
    email: '',
    phonenumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    isRememberMe: false
  }


  constructor(private store: Store<UState>,private auth: AuthService, private notifier : NotificationService) {
    if( Cookie.get('remember')!== undefined){
      if(Cookie.get('remember') ==="Yes"){
        this.user.email = Cookie.get('username')
        this.user.password = Cookie.get('password')
        
      }
    }
  }
  
  errorMessage$!: Observable<string>;

  ngOnInit(): void {
    
  }

  


  login(user: User) : void {
    this.isLoading.next(true);
    
    const email = user.email
    const password = user.password

    if (email == '') {
      this.notifier.onWarning("Please enter username")
      return;
    }
    if (password == '') {
      this.notifier.onWarning("Please enter password")
      return;
    }

    this.store.dispatch(UserLoginActions.loginUser({user}))
   

  }

  
}
