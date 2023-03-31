import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer';
import { usersReducer } from './users/reducer';
import { authorsReducer } from './authors/reducer';

export const rootReducer = combineReducers({
	courses: coursesReducer,
	user: usersReducer,
	authors: authorsReducer,
	//could be extended by another slice of reducer that respond for other part of your app
});

export const store = configureStore({ reducer: rootReducer });
