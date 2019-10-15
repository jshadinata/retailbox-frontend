import React from "react";
import { AuthContext } from "./context/Auth.js";
import {
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CompanyListItem from "./CompanyListItem.js";
import { Link } from "react-router-dom";

export default function CompanyList({ companies }) {
  const auth = React.useContext(AuthContext);

  const listItems = companies.map((item, index) => {
    return (
      <React.Fragment key={item.id}>
        <Divider component="li" />
        <CompanyListItem company={item} selectCompany={auth.selectCompany} />
      </React.Fragment>
    );
  });

  return (
    <Paper mb={3}>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h3">Perusahaan</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton color="primary" component={Link} to="/company/add">
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {listItems}
      </List>
    </Paper>
  );
}
