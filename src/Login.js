import React from 'react';
import {
	Button,
	Box,
	Container,
	TextField,
	Typography,
} from '@material-ui/core';
import { AuthContext } from './context/Auth.js';

function Login() {

	const auth = React.useContext(AuthContext);

	const [user,setUser] = React.useState('');
	const [password, setPassword] = React.useState('');

	const doLogin = (e) => {
		e.preventDefault();
		auth.login(user, password);
	}

	function ErrorDisplay() {
		if (auth.isLoginError) {
			return (
				<Box textAlign="center">
					<Typography color="error">{auth.loginErrorMessage}</Typography>
				</Box>
			);
		} else {
			return null;
		}
	}

	return (
		<Container maxWidth="sm">
			<Box mt={10} textAlign="center">
				<Typography variant="h3">Login</Typography>
			</Box>
			<form onSubmit={doLogin}>
				<TextField label="Username or Email" margin="normal" fullWidth variant="outlined" autoFocus={true} value={user} onChange={e => setUser(e.target.value)} />
				<TextField label="Password" type="password" margin="normal" fullWidth variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
				<Box my={3}>
					<Button type="submit" fullWidth variant="contained" color="primary" size="large" onClick={doLogin} >Login</Button>
				</Box>
			</form>
			<ErrorDisplay />
		</Container>
	);
}

export default Login;