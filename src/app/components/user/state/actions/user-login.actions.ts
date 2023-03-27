import {createAction,props} from '@ngrx/store';
import { User } from '../../user';


export const loginUser = createAction(
    '[User Page] load login user page',
      props<{user: User}>()
);

export const loginUserSuccess = createAction(
    '[User API] loginUser Success',
    props<{user: User}>()
);

export const loginUserFailure = createAction(
    '[User API] loginUser Failure',
    props<{error: string}>()
);

