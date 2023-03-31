import React from 'react';
export default function Button(Props) {
	return (
		<button
			disabled={Props.disabled}
			onClick={Props.onClick}
			className={Props.style}
		>
			{Props.label}
		</button>
	);
}
