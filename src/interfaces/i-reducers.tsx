import ICourseResponse from './i-courseResponse';
import IAuthorInfo from './i-authorInfo';
export default interface IReducers {
	courses: ICourseResponse;
	authors: IAuthorInfo[];
}
