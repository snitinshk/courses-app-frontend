import { CoursesActionTypes, CourseType, CoursesAction } from './types';

export const initCoursesState = {
	isError: false,
	data: [] as CourseType[],
};
export const initCounter = 0;

export function coursesReducer(
	state = initCoursesState,
	action: CoursesAction
) {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return {
				isError: false,
				data: action.payload,
			};
		case CoursesActionTypes.ADD_COURSE:
			return {
				isError: false,
				data: [...state.data, action.payload],
			};
		case CoursesActionTypes.UPDATE_COURSE: {
			return {
				isError: false,
				data: state.data.map((course) =>
					course.id === action.courseId ? action.payload : course
				),
			};
		}

		case CoursesActionTypes.DELETE_COURSE:
			return {
				isError: false,
				data: state.data.filter((course) => course.id !== action.courseId),
			};
		case CoursesActionTypes.ERROR:
			return {
				isError: true,
				data: action.error,
			};
		default:
			return state;
	}
}
