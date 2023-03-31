import { UsersActionTypes, UserType } from './types';

type LoginAction = {
	type: UsersActionTypes.LOGIN;
	payload: UserType;
};

type LogoutAction = {
	type: UsersActionTypes.LOGOUT;
};

export const LoginUserAction = (userData: UserType): LoginAction => ({
	type: UsersActionTypes.LOGIN,
	payload: userData,
});

export const LogoutUserAction = (): LogoutAction => ({
	type: UsersActionTypes.LOGOUT,
});
