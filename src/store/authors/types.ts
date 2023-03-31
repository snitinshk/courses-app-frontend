export const enum AuthorsActionTypes {
	SAVE_AUTHORS = 'SAVE_AUTHORS',
	ADD_AUTHOR = 'ADD_AUTHOR',
	DELETE_AUTHOR = 'DELETE_AUTHOR',
	ERROR = 'ERROR',
}

export type AuthorType = {
	id: string;
	name: string;
};

interface SaveAuthors {
	type: AuthorsActionTypes.SAVE_AUTHORS;
	payload: AuthorType[];
}

interface AddAuthor {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: AuthorType;
}

interface DeleteAuthor {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	authorId: string;
}

interface Error {
	type: AuthorsActionTypes.ERROR;
	error: string;
}

export type AuthorsAction = SaveAuthors | AddAuthor | DeleteAuthor | Error;
