import styles from './CourseInfo.module.scss';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatTime, formatDate } from 'src/constants/contants';
import ICourseInfo from 'src/interfaces/i-courseInfo';
import { useSelector } from 'react-redux';
import IReducers from 'src/interfaces/i-reducers';

export default function CoursesInfo() {
	const courseId = useParams().courseId;
	const courses = useSelector((state: IReducers) => state.courses);
	const authors = useSelector((state: IReducers) => state.authors);
	const [courseAuthorsName, setCourseAuthorsName] = React.useState<
		Array<string>
	>([]);
	const [courseInfo, setCourseInfo] = React.useState<ICourseInfo>();
	React.useEffect(() => {
		window.scrollTo(0, 0);
		const courseDetail = courses.data.filter(
			(course) => course.id == courseId
		)[0];
		setCourseInfo(courseDetail);
		const courseAuthors = courseDetail.authors.map(
			(author) => authors.find((authorList) => authorList.id === author).name
		);
		setCourseAuthorsName(courseAuthors);
	}, []);
	return (
		<div className={styles.coursesInfoContainer}>
			<div className={styles.courseBack}>
				<span>
					<Link to='/courses'>Back to Courses</Link>
				</span>
			</div>
			<div className={styles.courseLabel}>
				<span>
					<strong>{courseInfo && courseInfo.title}</strong>
				</span>
			</div>
			<div className={styles.courseDetails}>
				<div className={styles.courseInfo}>
					<span>{courseInfo && courseInfo.description}</span>
				</div>
				<div>
					<div className={styles.courseMeta}>
						<div className={styles.courseBox}>
							<span>ID</span>
							<span>{courseInfo && courseInfo.id}</span>
						</div>
						<div className={styles.courseBox}>
							<span>
								<strong>Duration:</strong>
							</span>
							<span>{courseInfo && formatTime(courseInfo.duration)}</span>
						</div>
						<div className={styles.courseBox}>
							<span>
								<strong>Created:</strong>
							</span>
							<span>{courseInfo && formatDate(courseInfo.creationDate)}</span>
						</div>
						<div className={styles.courseBox}>
							<span>Authors:</span>
							<span>{courseAuthorsName && courseAuthorsName.join(', ')}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
