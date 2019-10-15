import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard.js';
import Login from './Login.js';
import { AuthContext, useAuth } from './context/Auth.js';


function App({isAuthenticated}) {  	
	const auth = useAuth();		
	return (
  	<Router>
  		<AuthContext.Provider value={auth}>
  			{ 
  				(auth.isAmnesia) ? 
  					(<p>Connecting to server...</p>) :
  					((auth.isLogged) ? <Dashboard /> : <Login />)
  			}
  		</AuthContext.Provider>
    </Router>
  );
}

export default App;