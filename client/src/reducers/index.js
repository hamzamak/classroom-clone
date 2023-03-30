import { combineReducers } from 'redux';
import authReducers from './auth';

import roomReducers from './rooms';

export const reducers = combineReducers({ roomReducers  , authReducers });

