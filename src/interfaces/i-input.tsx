import { ChangeEventHandler } from 'react';

export default interface IInput {
	label?: string;
	value?: string | number;
	onChange?: ChangeEventHandler;
	style?: string;
	placeholder?: string;
	type?: string;
	min?: number;
	checked?: boolean;
}
