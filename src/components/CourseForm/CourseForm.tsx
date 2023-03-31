import styles from './CourseForm.module.scss';
import React, { useEffect } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import AuthorItem from './components/AuthorItem';
import { formatTime } from '../../constants/contants';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from 'src/interfaces/i-reducers';
import IAuthorInfo from 'src/interfaces/i-authorInfo';
import { addNewCourse, updateCourse } from 'src/store/courses/thunk';
import { addNewAuthor } from 'src/store/authors/thunk';

// import IAuthorInfo from 'src/interfaces/i-authorInfo';
export default function CourseForm() {
	console.log('Course form opened');
	const [durationValue, setDurationValue] = React.useState<string>('00:00');
	const [duration, setDuration] = React.useState<number>();
	const [authorName, setAuthorName] = React.useState<string>('');
	const [titleValue, setTitleValue] = React.useState<string>('');
	const [descriptionValue, setDescriptionValue] = React.useState<string>('');
	const [selectedAuthors, addSelectedAuthor] = React.useState<any>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const courseId = useParams().courseId;
	if (courseId) {
		const courses = useSelector((state: IReducers) => state.courses);
		useEffect(() => {
			const courseDetail = courses.data.filter(
				(course) => course.id == courseId
			)[0];
			setTitleValue(courseDetail.title);
			setDescriptionValue(courseDetail.description);
			setDuration(courseDetail.duration);
			setDurationValue(formatTime(courseDetail.duration));
			addSelectedAuthor(courseDetail.authors);
		}, []);
	}

	const authors = useSelector(
		(state: IReducers): IAuthorInfo[] => state.authors
	);

	const addAuthor = async () => {
		dispatch(addNewAuthor(authorName));
		setAuthorName('');
	};

	const addTitle = (event) => {
		setTitleValue(event.target.value);
	};

	const handleSelectAuthor = (e) => {
		const selectedId = e.target.value;
		if (e.target.checked) {
			addSelectedAuthor([...selectedAuthors, selectedId]);
		} else {
			addSelectedAuthor(() =>
				selectedAuthors.filter((authorId: string) => authorId !== selectedId)
			);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			titleValue &&
			descriptionValue &&
			durationValue &&
			selectedAuthors.length
		) {
			const [hours, minutes] = durationValue.split(':');
			const durationInMins = Number(hours) * 60 + Number(minutes);
			const courseDetail = {
				title: titleValue,
				description: descriptionValue,
				creationDate: `${new Date().getDate()}/${
					new Date().getMonth() + 1
				}/${new Date().getFullYear()}`,
				duration: durationInMins,
				authors: selectedAuthors,
			};
			if (courseId) {
				dispatch(updateCourse(courseDetail, courseId));
			} else {
				dispatch(addNewCourse(courseDetail));
			}
			navigate('/courses');
		} else {
			alert('All fields are mandatory');
		}
	};
	return (
		<div className={styles.createCourse}>
			<div>
				<form onSubmit={handleSubmit}>
					<div className={styles.createCourseRow1}>
						<Input
							value={titleValue}
							onChange={addTitle}
							placeholder={'Enter title...'}
							label={'Title'}
						/>
						<Button label={courseId ? 'Update Course' : 'Create course'} />
					</div>
					<div className={styles.createCourseRow2}>
						<label>Description</label>
						<textarea
							value={descriptionValue}
							onChange={(event) => setDescriptionValue(event.target.value)}
							placeholder='Enter description'
						></textarea>
					</div>
				</form>
				<div className={styles.createCourseRow3}>
					<div className={styles.addAuthorWrapper}>
						<label>
							<strong>Add authors</strong>
						</label>
						<div className={styles.addAuthor}>
							<Input
								value={authorName}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setAuthorName(event.target.value)
								}
								label={'Author name'}
								placeholder={'Enter author name...'}
							/>
							<Button
								disabled={authorName.length < 2}
								onClick={addAuthor}
								label={'Create author'}
							/>
						</div>
						<div className={styles.duration}>
							<Input
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setDurationValue(formatTime(event.target.value))
								}
								value={duration}
								type={'number'}
								min={0}
								placeholder={'Enter duration in minutes...'}
								label={'Duration'}
							/>
							<div>
								<label>
									Duration: <strong>{durationValue}</strong> hours
								</label>
							</div>
						</div>
					</div>
					<div className={styles.authorListWrapper}>
						<label>
							<strong>Authors</strong>
						</label>
						<div>
							{authors.length ? (
								authors.map((author, index) => (
									<AuthorItem
										key={index}
										selectedAuthors={selectedAuthors}
										selectAuthor={handleSelectAuthor}
										author={author}
									/>
								))
							) : (
								<label>Author list is empty</label>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
