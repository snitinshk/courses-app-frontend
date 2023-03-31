import { Routes, Route, Navigate } from 'react-router-dom';

import React from 'react';
import Registration from 'src/components/Registration/Registration';
import Login from 'src/components/Login/Login';
import Header from 'src/components/Header/Header';
import Courses from 'src/components/Courses/Courses';
import CourseForm from 'src/components/CourseForm/CourseForm';
import CoursesInfo from 'src/components/CourseInfo/CourseInfo';
import PrivateRoute from 'src/components/PrivateRoute/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import IReducers from 'src/interfaces/i-reducers';
import ICourseResponse from 'src/interfaces/i-courseResponse';
import IAuthorInfo from 'src/interfaces/i-authorInfo';
import { getAllCourses } from 'src/store/courses/thunk';
import { getAuthors } from 'src/store/authors/thunk';

export default function RoutesPath() {
	const dispatch = useDispatch<any>();
	const courses = useSelector(
		(state: IReducers): ICourseResponse => state.courses
	);
	const authors = useSelector(
		(state: IReducers): IAuthorInfo[] => state.authors
	);

	React.useEffect(() => {
		fetchCoursesAndAuthors();
	}, []);
	const fetchCoursesAndAuthors = async () => {
		dispatch(getAllCourses());
		dispatch(getAuthors());
	};

	return (
		<>
			<Routes>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login />} />
				<Route path='/' element={<Header />}>
					<Route
						path='courses'
						element={<Courses courses={courses} authors={authors} />}
					/>
					<Route path='course-info/:courseId' element={<CoursesInfo />} />
					<Route path='courses/add' element={<CourseForm />} />
					{/* <Route
						path='courses/add'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/> */}
					<Route
						path='courses/update/:courseId'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
					{/* <Route path='courses/add' element={<CreateCourse />} /> */}
				</Route>
				<Route path='*' element={<Navigate to='/login' />} />
			</Routes>
		</>
	);
}
