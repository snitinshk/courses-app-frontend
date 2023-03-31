import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function PrivateRoute({ children }) {
	const userRole = useSelector((state) => state['user'].role);
	return userRole === 'admin' ? children : <Navigate to='/courses' />;
}
