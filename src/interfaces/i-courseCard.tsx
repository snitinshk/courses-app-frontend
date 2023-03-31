import ICourseInfo from './i-courseInfo';
import IAuthorInfo from './i-authorInfo';
export default interface ICourseCard {
	courseDetail: ICourseInfo;
	authors: IAuthorInfo[];
}
