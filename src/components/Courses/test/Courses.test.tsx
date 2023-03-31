import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Courses from '../Courses';
import { mockedCoursesList, mockedAuthorsList } from 'src/constants/contants';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'src/store/rootReducer';
import { Provider } from 'react-redux';

afterEach(cleanup);
const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
	useLocation: () => mockedUseLocation,
}));

describe('Courses', () => {
	test('it should display amount of CourseCard equal length of courses array', async () => {
		const mockCourse = {
			data: mockedCoursesList,
		};
		const mockStore = configureStore({ reducer: rootReducer });
		const Wrapper = ({ children }) => (
			<Provider store={mockStore}>{children}</Provider>
		);
		render(<Courses courses={mockCourse} authors={mockedAuthorsList} />, {
			wrapper: Wrapper,
		});
		const courseCard = await screen.findAllByText('Duration:');
		expect(courseCard).toHaveLength(mockedCoursesList.length);
	});
	test('should be shown after a click on the "Add new course" button', async () => {
		const mockCourse = {
			data: mockedCoursesList,
		};
		const mockStore = configureStore({ reducer: rootReducer });
		const Wrapper = ({ children }) => (
			<Provider store={mockStore}>{children}</Provider>
		);
		render(<Courses courses={mockCourse} authors={mockedAuthorsList} />, {
			wrapper: Wrapper,
		});
		fireEvent.click(screen.getByText('Add new Course'), {});
		//Unable to complete
	});
});
