import styles from './Courses.module.scss';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import React from 'react';

export default function Courses({ courses, authors }) {
	return (
		<div className={styles.coursesContainer}>
			<div>
				<SearchBar />
				{courses?.data?.map((course, index) => (
					<CourseCard key={index} authors={authors} courseDetail={course} />
				))}
			</div>
		</div>
	);
}
