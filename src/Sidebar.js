import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	companyLogo : {
		height: 70,
		width: 70,
	},
});

function Sidebar() {
	const classes = useStyles();

	return(
		<div>
			<Box m={3}>
				<Grid container justify="center" alignItems="center">
					<Avatar className={classes.companyLogo}>NP</Avatar>
				</Grid>
				<Grid container justify="center">
					<Typography variant="h5">Nama Perusahaan</Typography>
				</Grid>
			</Box>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon><AssignmentIcon /></ListItemIcon>
					<ListItemText primary="Penjualan" />
				</ListItem>
				<ListItem button>
					<ListItemIcon><AssignmentOutlinedIcon /></ListItemIcon>
					<ListItemText primary="Pembelian" />
				</ListItem>
				<ListItem button>
					<ListItemIcon><LocalMallIcon /></ListItemIcon>
					<ListItemText primary="Produk" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon><SettingsIcon /></ListItemIcon>
					<ListItemText primary="Pengaturan" />
				</ListItem>				
			</List>
		</div>
	);
}

export default Sidebar;