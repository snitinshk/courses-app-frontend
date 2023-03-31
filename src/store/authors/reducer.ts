import { AuthorsActionTypes, AuthorType, AuthorsAction } from './types';

export const authorsInitialState = [] as AuthorType[];

export function authorsReducer(
	state = authorsInitialState,
	action: AuthorsAction
) {
	switch (action.type) {
		case AuthorsActionTypes.SAVE_AUTHORS:
			return [...state, ...action.payload];
		case AuthorsActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		case AuthorsActionTypes.DELETE_AUTHOR:
			return state.filter((author) => author.id !== action.authorId);
		default:
			return state;
	}
}
