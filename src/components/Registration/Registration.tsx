import React, { useState, FormEvent } from 'react';
import styles from './Registration.module.scss';
import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import { useNavigate, Link } from 'react-router-dom';
import api from 'src/services';

export default function Registration(): JSX.Element {
	const navigate = useNavigate();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	React.useEffect(() => {
		if (localStorage.getItem('auth-token') != null) {
			navigate('/courses');
		}
	}, []);
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newUser = {
			name,
			email,
			password,
		};

		const response = await api.sendPostReq(newUser, 'register');
		const resultObj = await response.json();
		if (response.status === 201) {
			navigate('/login');
		} else {
			const error = resultObj.errors ? resultObj.errors[0] : resultObj.result;
			setErrorMsg(error);
		}
	};

	return (
		<div className={styles.registrationContainer}>
			{errorMsg ? (
				<label className={styles.error}>{errorMsg.replace(/'/g, '')}</label>
			) : (
				<></>
			)}
			<label>Registration</label>
			<form onSubmit={handleSubmit} className={styles.registrationForm}>
				<div>
					<Input
						style={styles.registerInput}
						onChange={handleNameChange}
						placeholder={'Enter Name'}
						label={'Name'}
					/>
				</div>
				<div>
					<Input
						style={styles.registerInput}
						onChange={handleEmailChange}
						placeholder={'Enter Email'}
						label={'Email'}
					/>
				</div>
				<div>
					<Input
						type={'password'}
						style={styles.registerInput}
						onChange={handlePasswordChange}
						placeholder={'Enter Password'}
						label={'Password'}
					/>
				</div>
				<div>
					<Button
						disabled={!name || !email || !password}
						style={styles.registerButton}
						label={'Register'}
					/>
					<label>
						&nbsp;&nbsp;<Link to='/login'>Login</Link>
					</label>
				</div>
			</form>
		</div>
	);
}
