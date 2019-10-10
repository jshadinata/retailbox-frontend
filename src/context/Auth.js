import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config.js';

export const AuthContext = React.createContext({
	isLogged: false,
	user: null,
	isLoginError: false,
	loginErrorMessage: '',
	doLogin: () => {},
	doLogout: () => {},
	ping: () => {},
});

export function useAuth() {

	const [isAmnesia, setAmnesia] = useState(true); // forget who is the current user
	const [isLogged, setLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoginError, setLoginError] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');

	const whoami = () => {
		const url = API_URL + '/users/whoami';
		axios.get(url)
			.then(response => {
				if (response.data.result) {
					setAmnesia(false);
					setLogged(true);
					setUser(response.data.user);
				} else {
					setAmnesia(false);
					setLogged(false);
				}
			});	
	}

	const login = (username, password) => {
		setLoginError(false);
		setLoginErrorMessage('');
		const url = API_URL + '/users/login';
		axios.post(url, { username: username, password: password })
			.then(response => {
				if (response.data.result) {
					setLogged(true);
					whoami();
				} else {
					setLoginError(true);
					setLoginErrorMessage(response.data.message);
				}
			});
	};

	const logout = () => {
		const url = API_URL + '/users/logout';
		axios.get(url);
		setLogged(false);
		setUser(null);
	}

	if (isAmnesia) whoami();

	return { 
		isAmnesia,
		isLogged, 		
		user,
		login, 
		logout, 	
		isLoginError,		
		loginErrorMessage,
	};


}