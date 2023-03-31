import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { formatTime, formatDate } from 'src/constants/contants';
import IAuthorInfo from 'src/interfaces/i-authorInfo';

afterEach(cleanup);
const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();

const mockedUsedDispatch = jest.fn();
const mockedUsedSelector = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedUsedDispatch,
	useSelector: () => mockedUsedSelector,
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
	useLocation: () => mockedUseLocation,
}));

const mockCourseDetail = {
	id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
	title: 'Angular',
	description: `Lorem Ipsum`,
	creationDate: '10/11/2020',
	duration: '210',
	authors: [
		'df32994e-b23d-497c-9e4d-84e4dc02882f',
		'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
	],
};
const mockedAuthorsList = [
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Vasiliy Dobkin',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Nicolas Kim',
	},
];

describe('CourseCard', () => {
	test('renders CourseCard component', () => {
		render(
			<CourseCard authors={mockedAuthorsList} courseDetail={mockCourseDetail} />
		);
	});
	test('it should display title, discription', () => {
		render(
			<CourseCard authors={mockedAuthorsList} courseDetail={mockCourseDetail} />
		);
		expect(screen.getByText(mockCourseDetail.title)).toBeInTheDocument();
		expect(screen.getByText(mockCourseDetail.description)).toBeInTheDocument();
	});
	test('it should display formatted duration and date', () => {
		render(
			<CourseCard authors={mockedAuthorsList} courseDetail={mockCourseDetail} />
		);
		expect(
			screen.getByText(`${formatTime(mockCourseDetail.duration)} hours`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`${formatDate(mockCourseDetail.creationDate)}`)
		).toBeInTheDocument();
	});
	test('it should display authors list', () => {
		render(
			<CourseCard authors={mockedAuthorsList} courseDetail={mockCourseDetail} />
		);
		const authorsName = mockCourseDetail?.authors.map(
			(authorId) =>
				mockedAuthorsList?.find(
					(authorList: IAuthorInfo) => authorList.id === authorId
				)?.name
		);
		expect(screen.getByText(authorsName.join(', '))).toBeInTheDocument();
	});
});
