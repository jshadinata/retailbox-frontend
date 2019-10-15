import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Box, Typography, LinearProgress } from "@material-ui/core";
import { CompanyController } from "./Controller.js";
import CompanyList from "./CompanyList.js";
import CompanyEditor from "./CompanyEditor.js";

export default function CompanyPanel() {
  const history = useHistory();

  const [isLoading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [companies, setCompanies] = React.useState([
    {
      id: 1,
      name: "Company A",
      address: "somewhere in earth"
    },
    {
      id: 2,
      name: "Company B",
      address: "only on net"
    }
  ]);

  async function fetchData() {
    setErrorMessage("");
    setLoading(true);
    const resp = await CompanyController.getList();
    if (resp.data.result) {
      setCompanies(resp.data.companies);
    } else {
      setErrorMessage(resp.data.message);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const afterSubmit = resp => {
    if (resp.data.result) {
      fetchData();
      history.push("/company");
    }
  };

  return (
    <React.Fragment>
      {isLoading ? <LinearProgress /> : false}

      <Switch>
        <Route path="/company" exact>
          <CompanyList companies={companies} />
        </Route>
        <Route path="/company/add">
          <CompanyEditor afterSubmit={afterSubmit} />
        </Route>
        <Route path="/company/edit/:id">
          <CompanyEditor afterSubmit={afterSubmit} />
        </Route>
      </Switch>

      {Boolean(errorMessage) ? (
        <Box marginY={3}>
          <Typography color="error">Error: {errorMessage}</Typography>
        </Box>
      ) : (
        false
      )}
    </React.Fragment>
  );
}
