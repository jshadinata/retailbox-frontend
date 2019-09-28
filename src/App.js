import React from 'react';
import { 
	BrowserRouter as Router,
} from 'react-router-dom';
import Dashboard from './Dashboard.js';
import Login from './Login.js';

function App({isAuthenticated}) {  
	return (
  	<Router>
  		{(isAuthenticated) ? <Dashboard /> : <Login />}
    </Router>
  );
}

export default App;