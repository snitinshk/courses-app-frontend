import Button from '../../../common/Button/Button';
import styles from '../CourseForm.module.scss';
import React from 'react';
import { deleteAuthor } from 'src/store/authors/thunk';
import { useDispatch } from 'react-redux';
import api from 'src/services';
import Input from 'src/common/Input/Input';

export default function AuthorItem(Props) {
	const { id, name } = Props.author;
	const selectedAuthors = Props.selectedAuthors;
	const handleSelectAuthor = Props.selectAuthor;
	const dispatch = useDispatch<any>();
	const handleDeleteAuthor = () => {
		dispatch(deleteAuthor(id));
	};
	return (
		<div className={styles.authorItem}>
			<label>{name}</label>
			<Input
				type='checkbox'
				checked={selectedAuthors.includes(id)}
				onChange={handleSelectAuthor}
				value={id}
			/>
			<Button onClick={handleDeleteAuthor} label={'Delete'} />
		</div>
	);
}
