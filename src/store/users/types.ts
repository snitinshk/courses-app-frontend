export const enum UsersActionTypes {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

export type UserType = {
	isAuth: boolean; // default value - false. After success login - true
	name: string; // default value - empty string. After success login - name of user
	email: string; // default value - empty string. After success login - email of user
	token: string; // default value - empty string or token value from localStorage.
	role: string; // new value
};

interface Login {
	type: UsersActionTypes.LOGIN;
	payload: UserType;
}

interface Logout {
	type: UsersActionTypes.LOGOUT;
	payload: UserType;
}

export type UserAction = Login | Logout;
