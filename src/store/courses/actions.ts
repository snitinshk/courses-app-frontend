import { CoursesActionTypes, CourseType } from './types';

type AddNewCourseAction = {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
};
type UpdateCourseAction = {
	type: CoursesActionTypes.UPDATE_COURSE;
	payload: CourseType;
	courseId: string;
};

type SaveCoursesAction = {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: CourseType[];
};

type DeleteCoursesAction = {
	type: CoursesActionTypes.DELETE_COURSE;
	courseId: string;
};

type ErrorAction = {
	type: CoursesActionTypes.ERROR;
	error: string;
};

export const addNewCourseAction = (
	courseData: CourseType
): AddNewCourseAction => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

export const updateCourseAction = (
	courseData: CourseType,
	courseId: string
): UpdateCourseAction => ({
	type: CoursesActionTypes.UPDATE_COURSE,
	payload: courseData,
	courseId,
});

export const errorAction = (error: string): ErrorAction => ({
	type: CoursesActionTypes.ERROR,
	error,
});

export const deleteCourseAction = (courseId: string): DeleteCoursesAction => ({
	type: CoursesActionTypes.DELETE_COURSE,
	courseId,
});

export const getCourseInfoAction = (courseId: string) => ({
	type: CoursesActionTypes.GET_COURSE_INFO,
	courseId,
});

export const saveCoursesAction = (
	coursesData: CourseType[]
): SaveCoursesAction => ({
	type: CoursesActionTypes.SAVE_COURSES,
	payload: coursesData,
});
