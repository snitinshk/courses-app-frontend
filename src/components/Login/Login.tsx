import React, { useState, FormEvent } from 'react';
import styles from './Login.module.scss';
import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import { useDispatch } from 'react-redux';
import { LoginUserAction } from 'src/store/users/actions';
import { useNavigate, Link } from 'react-router-dom';
import api from 'src/services';

export default function Login(): JSX.Element {
	const dispatch = useDispatch();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [customMsg, setcustomMsg] = useState<string>('');
	const navigate = useNavigate();
	React.useEffect(() => {
		if (localStorage.getItem('auth-token') != null) {
			navigate('/courses');
		}
	}, []);
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};
	const getCurrentUser = async (authToken: string) => {
		const response = await api.sendGetReq('users/me', authToken);
		if (response.status == 200) {
			const resultObj = await response.json();
			const userObj = {
				...resultObj.result,
				isAuth: true,
				token: authToken,
			};
			dispatch(LoginUserAction(userObj));
		}
	};
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		setcustomMsg('');
		event.preventDefault();
		const userDetail = {
			email,
			password,
		};
		const response = await api.sendPostReq(userDetail, 'login');
		const resultObj = await response.json();
		if (response.status === 201) {
			const authToken = resultObj.result;
			localStorage.setItem('auth-token', authToken);
			getCurrentUser(authToken);
			// localStorage.setItem('auth-token', resultObj.result);
			navigate('/courses');
		} else {
			const error = resultObj.errors ? resultObj.errors[0] : resultObj.result;
			setErrorMsg(error);
		}
	};

	return (
		<div className={styles.loginContainer}>
			{errorMsg ? (
				<label className={styles.error}>{errorMsg.replace(/'/g, '')}</label>
			) : (
				<></>
			)}
			{customMsg ? (
				<label className={styles.success}>{customMsg}</label>
			) : (
				<></>
			)}

			<label>Login</label>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div>
					<Input
						style={styles.loginInput}
						onChange={handleEmailChange}
						placeholder={'Enter Email'}
						label={'Email'}
					/>
				</div>
				<div>
					<Input
						type={'password'}
						style={styles.loginInput}
						onChange={handlePasswordChange}
						placeholder={'Enter Password'}
						label={'Password'}
					/>
				</div>
				<div>
					<Button
						disabled={!email || !password}
						style={styles.loginButton}
						label={'Login'}
					/>
					<label>
						&nbsp;&nbsp;<Link to='/registration'>Register</Link>
					</label>
				</div>
			</form>
		</div>
	);
}
