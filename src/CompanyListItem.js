import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import BusinessIcon from "@material-ui/icons/Business";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function CompanyListItem({ company, selectCompany }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = e => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <ListItem button onClick={() => selectCompany(company.id)}>
      <ListItemAvatar>
        <Avatar>
          <BusinessIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText secondary={company.address}>{company.name}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to={"/company/edit/" + company.id}>
            Ubah
          </MenuItem>
          <MenuItem>Members</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
