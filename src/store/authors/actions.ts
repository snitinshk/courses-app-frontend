import { AuthorsActionTypes, AuthorType } from './types';

type AddNewAuthorAction = {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: AuthorType;
};
type SaveAuthorsAction = {
	type: AuthorsActionTypes.SAVE_AUTHORS;
	payload: AuthorType[];
};
type DeleteAuthorAction = {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	authorId: string;
};

type ErrorAction = {
	type: AuthorsActionTypes.ERROR;
	error: string;
};

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});

export const saveAuthorsAction = (
	authorData: AuthorType[]
): SaveAuthorsAction => ({
	type: AuthorsActionTypes.SAVE_AUTHORS,
	payload: authorData,
});

export const deleteAuthorAction = (authorId: string): DeleteAuthorAction => ({
	type: AuthorsActionTypes.DELETE_AUTHOR,
	authorId,
});

export const errorAction = (error: string): ErrorAction => ({
	type: AuthorsActionTypes.ERROR,
	error,
});
