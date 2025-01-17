import React from 'react';
import {
	AppBar,
	Avatar,
	Button,
	Box,
	CssBaseline,
	Drawer,
	Hidden,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { 
	Menu as MenuIcon,
	Person as PersonIcon, 
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/Auth.js';
import Sidebar from './Sidebar.js';
import CompanyPanel from './CompanyPanel.js';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
  	flexGrow: 1,
  }, 
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UserAvatarMenu() {
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const auth = React.useContext(AuthContext);	

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button onClick={handleClick} color="inherit">
				<Avatar>
					<PersonIcon />
				</Avatar>		
				<Box ml={1} style={{textTransform:'none'}}>{ (auth.user) ? auth.user.username : 'loading username...' }</Box>		
			</Button>
			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>				
				<MenuItem>Profile</MenuItem>
				<MenuItem onClick={auth.logout}>Logout</MenuItem>				
			</Menu>
		</div>
	);
}

function Dashboard() {  
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
  	  <div className={classes.root}>
	      <CssBaseline />

	    	{/* App Bar */}
	      <AppBar position="fixed" className={classes.appBar}>
	        <Toolbar>
	          
	          <IconButton
	            color="inherit"
	            aria-label="open drawer"
	            edge="start"
	            onClick={handleDrawerToggle}
	            className={classes.menuButton}
	          >
	            <MenuIcon />
	          </IconButton>

	          <Typography variant="h6" noWrap className={classes.title}>
	            Retailbox
	          </Typography>	          
	          
	          <UserAvatarMenu />
	          
	        </Toolbar>
	      </AppBar>

	    	{/* Drawer / Sidebar */}
	      <nav className={classes.drawer} aria-label="mailbox folders">
	        <Hidden smUp implementation="css">
	          <Drawer            
	            variant="temporary"
	            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
	            open={mobileOpen}
	            onClose={handleDrawerToggle}
	            classes={{
	              paper: classes.drawerPaper,
	            }}
	            ModalProps={{
	              keepMounted: true, // Better open performance on mobile.
	            }}
	          >
	            <Sidebar />
	          </Drawer>
	        </Hidden>
	        <Hidden xsDown implementation="css">
	          <Drawer
	            classes={{
	              paper: classes.drawerPaper,
	            }}
	            variant="permanent"
	            open
	          >
	            <Sidebar />
	          </Drawer>
	        </Hidden>
	      </nav>

	    	{/* Main Content */}
	      <main className={classes.content}>
	        <div className={classes.toolbar} />	        
	        <Switch>
		        <Route path='/' exact component={() => (<h1>Dashboard</h1>)} />
		        <Route path='/sales' component={() => (<h1>Penjualan</h1>)} />
		        <Route path='/purchase' component={()=>(<h1>Pembelian</h1>)} />
		        <Route path='/product' component={()=>(<h1>Produk</h1>)} />
		        <Route path='/company' component={CompanyPanel} />
	        </Switch>
	      </main>
	    </div>
  );
}

export default Dashboard;