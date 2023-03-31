import React from 'react';
import styles from '../../Courses.module.scss';
import { formatTime, formatDate } from 'src/constants/contants';
import Button from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import ICourseCard from 'src/interfaces/i-courseCard';
import IAuthorInfo from 'src/interfaces/i-authorInfo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse } from 'src/store/courses/thunk';
export default function CourseCard({ courseDetail, authors }: ICourseCard) {
	const userRole = useSelector((state) => state['user'].role);
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const authorsName = courseDetail?.authors.map(
		(authorId) =>
			authors?.find((authorList: IAuthorInfo) => authorList.id === authorId)
				?.name
	);
	const handleShowCourse = () => {
		navigate(`/course-info/${courseDetail.id}`);
	};
	const handleUpdateCourse = () => {
		navigate(`/courses/update/${courseDetail.id}`);
	};
	const handleDeleteCourse = () => {
		if (courseDetail.id !== '66cc289e-6de9-49b2-9ca7-8b4f409d6467')
			dispatch(deleteCourse(courseDetail.id));
		else {
			alert(`Can't delete this course`);
		}
	};
	const renderDeleteAndUpdateForAdmin = () => {
		return userRole === 'admin' ? (
			<>
				<Button
					style={styles.showCourseBtn}
					onClick={handleUpdateCourse}
					label={'Update'}
				/>
				<Button
					style={styles.showCourseBtn}
					onClick={handleDeleteCourse}
					label={'Delete'}
				/>
			</>
		) : (
			<></>
		);
	};
	return (
		<div className={styles.courseCard}>
			<div className={styles.courseDetail}>
				<span>
					<strong>{courseDetail.title}</strong>
				</span>
				<span>{courseDetail.description}</span>
			</div>
			<div>
				<div className={styles.courseMeta}>
					<div className={styles.courseBox}>
						<span>Authors:</span>
						<span>{authorsName.join(', ')}</span>
					</div>
					<div className={styles.courseBox}>
						<span>
							<strong>Duration:</strong>
						</span>
						<span>{formatTime(courseDetail.duration)} hours</span>
					</div>
					<div className={styles.courseBox}>
						<span>
							<strong>Created:</strong>
						</span>
						<span>{formatDate(courseDetail.creationDate)}</span>
					</div>
					<div className={styles.actionBtns}>
						<Button
							onClick={handleShowCourse}
							style={styles.showCourseBtn}
							label={'Show course'}
						/>
						{renderDeleteAndUpdateForAdmin()}
					</div>
				</div>
			</div>
		</div>
	);
}
