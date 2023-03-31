import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Button from 'src/common/Button/Button';
import React, { useEffect } from 'react';
import api from 'src/services';
import { LoginUserAction, LogoutUserAction } from 'src/store/users/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
	const authToken = localStorage.getItem('auth-token');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state['user']);
	const location = useLocation();

	const logout = () => {
		localStorage.removeItem('auth-token');
		api.logout(authToken);
		dispatch(LogoutUserAction());
		navigate('/login');
	};

	useEffect(() => {
		if (location.pathname === '/' || authToken === null) {
			navigate('/login');
		} else if (authToken !== null && !userInfo.isAuth) {
			getCurrentUser();
		}
	}, []);

	const getCurrentUser = async () => {
		if (authToken != null) {
			const response = await api.sendGetReq('users/me', authToken);
			if (response.status == 200) {
				const resultObj = await response.json();
				const userObj = {
					isAuth: true,
					token: authToken,
					...resultObj.result,
				};
				dispatch(LoginUserAction(userObj));
			} else {
				logout();
			}
		} else {
			navigate('/login');
		}
	};
	return (
		<>
			<div className={styles.header}>
				<div className={styles.leftWrapper}>
					<Logo />
					<span>
						<strong>Courses</strong>
					</span>
				</div>
				{userInfo.isAuth ? (
					<div className={styles.rightWrapper}>
						<span>
							<strong>{userInfo.name}</strong>
						</span>
						<Button
							onClick={logout}
							style={styles.logoutBtn}
							label={'Logout'}
						/>
					</div>
				) : (
					<></>
				)}
			</div>
			<Outlet />
		</>
	);
}
