import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'src/store/rootReducer';
// import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import Header from '../Header';

const mockUserInfo = {
	isAuth: true,
	name: 'shivam',
};

beforeEach(() => {
	jest.spyOn(Redux, 'useSelector').mockReturnValue(mockUserInfo);
});
afterEach(cleanup);
const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();

const mockedUsedDispatch = jest.fn();
// const mockedUsedSelector = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedUsedDispatch,
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
	useLocation: () => mockedUseLocation,
}));

describe('Header', () => {
	test('renders Header component', () => {
		render(<Header />);
	});
	test('if the header has logo', () => {
		render(<Header />);
		waitFor(() => expect(screen.getAllByRole('img')).toBeInTheDocument());
	});
	test('if the header has username', () => {
		const mockStore = configureStore({ reducer: rootReducer });
		const Wrapper = ({ children }) => (
			<Redux.Provider store={mockStore}>{children}</Redux.Provider>
		);
		render(<Header />, { wrapper: Wrapper });
		expect(screen.getAllByText(mockUserInfo.name)).toBeInTheDocument;
		// screen.debug();
	});
});
