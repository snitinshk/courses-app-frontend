import React from 'react';
import styles from '../../Courses.module.scss';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
	const navigate = useNavigate();
	const handleSearch = () => {
		// alert('I am clicked from search');
	};
	const handleAddCourse = () => {
		navigate('add');
	};
	return (
		<div className={styles.searchBar}>
			<Input placeholder={'Enter course name...'} type={'text'} />
			<div>
				<Button onClick={handleSearch} label={'Search'} />
				<Button
					onClick={handleAddCourse}
					style={styles.addCourse}
					label={'Add new Course'}
				/>
			</div>
		</div>
	);
}
