import { Injectable } from '@angular/core';
import {Actions,createEffect,ofType} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, concatMap, delay, map, mergeMap, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from '../user';
import {UserSignupActions, UserLoginActions} from './actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffect{
// your backend base api url
 constructor(private actions$ :Actions, private authService: AuthService,private spinner : NgxSpinnerService,private notifier : NotificationService){}

 postSignup$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserSignupActions.signupUser),
    tap(() => this.spinner.show()),
    delay(600),
    switchMap((action) =>
      this.authService.register(action.user).pipe(
        map((user: User) =>
          UserSignupActions.signupUserSuccess({ user })
        ),
        catchError((error) =>
          of(UserSignupActions.signupUserFailure({ error }))
        )
      )
    ),
    tap(() => this.spinner.hide()),
    tap((action) => {
      if (UserSignupActions.signupUserFailure.type === action.type) {
        this.notifier.onError('Request failed. Please try again later.');
      }
      else if(UserSignupActions.signupUserSuccess.type === action.type) {
        this.notifier.onSuccess('Registration is successful');
      }
    })
)
 )


  postLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserLoginActions.loginUser),
      switchMap((action) => this.authService.login(action.user).pipe(
        map((user: User) => UserLoginActions.loginUserSuccess({ user })),
      catchError((error: string) => {
       console.log(error)
        return of(UserLoginActions.loginUserFailure({ error }));
      }))))
  });

    }