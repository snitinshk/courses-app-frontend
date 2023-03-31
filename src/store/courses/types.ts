export const enum CoursesActionTypes {
	SAVE_COURSES = 'SAVE_COURSES',
	ADD_COURSE = 'ADD_COURSE',
	UPDATE_COURSE = 'UPDATE_COURSE',
	DELETE_COURSE = 'DELETE_COURSES',
	GET_COURSE_INFO = 'GET_COURSE_INFO',
	ERROR = 'ERROR',
}

export type CourseType = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

interface SaveCourses {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: CourseType[];
}

interface AddCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
}

interface UpdateCourse {
	type: CoursesActionTypes.UPDATE_COURSE;
	payload: CourseType;
	courseId: string;
}

interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	courseId: string;
}

interface Error {
	type: CoursesActionTypes.ERROR;
	error: string;
}

export type CoursesAction =
	| SaveCourses
	| AddCourse
	| DeleteCourse
	| UpdateCourse
	| Error;
