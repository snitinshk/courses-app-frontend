import { UsersActionTypes, UserType, UserAction } from './types';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
} as UserType;

export function usersReducer(state = userInitialState, action: UserAction) {
	switch (action.type) {
		case UsersActionTypes.LOGIN:
			return action.payload;
		case UsersActionTypes.LOGOUT:
			return userInitialState;
		default:
			return state;
	}
}
