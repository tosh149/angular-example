import { state } from '@angular/animations';
import {createReducer,on,createAction,createFeatureSelector,createSelector} from '@ngrx/store';
import { User } from '../user';
import * as AppState from '../../../state/app.state'
import { UserLoginActions, UserSignupActions } from './actions';

export interface UState extends AppState.State{
    user: UserState;
}

export interface UserState{
    user : User;
    loggedIn: boolean;
    isLoading: boolean;
    errorMessage: string;
    hasError: boolean;
   
}

const initialState: UserState = {
    user: {name:'',email:'',phonenumber:'',username:'',password:'',confirmPassword:'',isRememberMe:false},
    loggedIn: false,
    isLoading: false,
    errorMessage: "",
    hasError: false
    
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.user
);

export const getError = createSelector(
    getUserFeatureState,
    state => state.errorMessage
);  

export const userReducer = createReducer(
    initialState,
    on(UserSignupActions.signupUserSuccess, (state,action) : UserState => {
        return{
            ...state,
            user: action.user,
            errorMessage: ""
        }
    }),
    on(UserSignupActions.signupUserFailure, (state,action) : UserState => {
        return{
            ...state,
            user: {name:'',email:'',phonenumber:'',username:'',password:'',confirmPassword:'',isRememberMe:false},
            errorMessage: action.error
        }
    }),
    on(UserLoginActions.loginUserSuccess, (state,action) : UserState => {
        return{
            ...state,
            user: action.user,
            errorMessage: ""
        }
    }),
    on(UserLoginActions.loginUserFailure, (state,action) : UserState => {
        return{
            ...state,
            user: {name:'',email:'',phonenumber:'',username:'',password:'',confirmPassword:'',isRememberMe:false},
            errorMessage: action.error
        }
    }),
)