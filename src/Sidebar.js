import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
	Avatar,
	Box,
	Divider,
	Grid,
	LinearProgress,
	List,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Typography
} from "@material-ui/core";
import {
	Settings as SettingsIcon,
	Assignment as AssignmentIcon,
	AssignmentOutlined as AssignmentOutlinedIcon,
	LocalMall as LocalMallIcon,
	Home as HomeIcon,
	Business as BusinessIcon
} from "@material-ui/icons";
import { AuthContext } from "./context/Auth.js";

const useStyles = makeStyles({
	companyLogo: {
		height: 70,
		width: 70
	}
});

function Sidebar() {
	const classes = useStyles();

	const auth = React.useContext(AuthContext);

	return (
		<React.Fragment>
			{auth.isLoading ? <LinearProgress /> : false}
			<Box m={3}>
				<Grid container justify="center" alignItems="center">
					<Avatar className={classes.companyLogo}>
						<BusinessIcon />
					</Avatar>
				</Grid>
				<Grid container justify="center">
					<Box mt={2}>
						<Typography variant="h5">
							{auth.user && auth.user.current_company
								? auth.user.current_company.name
								: "???"}
						</Typography>
					</Box>
				</Grid>
			</Box>
			<Divider />
			<List>
				<MenuItem component={Link} to="/">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</MenuItem>
				<MenuItem component={Link} to="/sales">
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Penjualan" />
				</MenuItem>
				<MenuItem component={Link} to="/purchase">
					<ListItemIcon>
						<AssignmentOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary="Pembelian" />
				</MenuItem>
				<MenuItem component={Link} to="/product">
					<ListItemIcon>
						<LocalMallIcon />
					</ListItemIcon>
					<ListItemText primary="Produk" />
				</MenuItem>
				<MenuItem component={Link} to="/company">
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary="Perusahaan" />
				</MenuItem>
			</List>
			<Divider />
			<List>
				<MenuItem component={Link} to="/settings">
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary="Pengaturan" />
				</MenuItem>
			</List>
		</React.Fragment>
	);
}

export default Sidebar;
