import { NgForm } from '@angular/forms';
import {createAction,props} from '@ngrx/store';
import { MyFormData, User } from '../../user';


export const signupUser = createAction(
    '[User Page] load signup user page',
     props<{user: MyFormData}>()
);

export const signupUserSuccess = createAction(
    '[User API] signupUser Success',
    props<{user: User}>()
);

export const signupUserFailure = createAction(
    '[User API] signupUser Failure',
    props<{error: string}>()
);

