import React from 'react';
import {
	Button,
	Box,
	Container,
	TextField,
	Typography,
} from '@material-ui/core';

function Login() {
	return (
		<Container maxWidth="sm">
			<Box mt={10} textAlign="center">
				<Typography variant="h3">Login</Typography>
			</Box>
			<TextField label="Username or Email" margin="normal" fullWidth variant="outlined" autoFocus={true} />
			<TextField label="Password" type="password" margin="normal" fullWidth variant="outlined" />
			<Box mt={3}>
				<Button fullWidth variant="contained" color="primary" size="large">Login</Button>
			</Box>
		</Container>
	);
}

export default Login;