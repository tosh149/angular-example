import {createReducer,on,createFeatureSelector,createSelector} from '@ngrx/store';
import { User } from '../user';
import * as AppState from '../../../state/app.state';
import { UserLoginActions, UserSignupActions } from './actions';
import { UserState } from './user.reducer';


export interface State extends AppState.State{
    user: UserState
}



const getUserFeatureState = createFeatureSelector<UserState>('user');