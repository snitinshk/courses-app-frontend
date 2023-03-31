import { coursesReducer } from '../courses/reducer';
import { CoursesActionTypes } from '../courses/types';
import { mockedCoursesList } from 'src/constants/contants';

describe('Courses', () => {
	test('it should return the initial state', () => {
		expect(coursesReducer(undefined, { type: null, payload: null })).toEqual({
			data: [],
			isError: false,
		});
	});
	test('it should handle SAVE_COURSE and returns new state.', () => {
		expect(
			coursesReducer(undefined, {
				type: CoursesActionTypes.SAVE_COURSES,
				payload: mockedCoursesList,
			})
		).toEqual({
			data: mockedCoursesList,
			isError: false,
		});
	});
});
