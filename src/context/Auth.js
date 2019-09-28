import React, { useState } from 'react';

export const AuthContext = React.createContext({
	isLogged: false,
	userName: '',	
	doLogin: () => { },
	doLogout: () => { },
});

export function useAuth() {
	const [isLogged, setLogged] = useState(false);
	const login = () => setLogged(true);
	const logout = () => setLogged(false);
	return { isLogged, setLogged, login, logout };
}