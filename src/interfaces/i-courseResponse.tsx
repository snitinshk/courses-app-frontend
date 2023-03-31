import ICourseInfo from './i-courseInfo';

export default interface ICourseResponse {
	isError: boolean;
	data: ICourseInfo[];
}
