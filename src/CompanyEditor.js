import React from "react";
import {
  Button,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { CompanyController } from "./Controller.js";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(2)
  },
  textField: {
    marginBottom: theme.spacing(1)
  }
}));

export default function CompanyEditor(props) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  // state
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errors, setErrors] = React.useState({});

  async function fetchData(id) {
    setErrorMessage("");
    setLoading(true);
    const resp = await CompanyController.getById(id);
    if (resp.data.result) {
      const c = resp.data.company;
      setName(c.name || "");
      setAddress(c.address || "");
      setPhone(c.phone || "");
      setEmail(c.email || "");
      setWebsite(c.website || "");
      setApiKey(c.api_key || "");
    } else {
      setErrorMessage(resp.data.message);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      fetchData(id);
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setErrors({});
    const comp = {
      name: name,
      address: address,
      phone: phone,
      email: email,
      website: website,
      apiKey: apiKey
    };
    let resp = null;
    if (id) {
      resp = await CompanyController.update(id, comp);
    } else {
      resp = await CompanyController.add(comp);
    }
    setLoading(false);
    if (resp.data.result) {
      if (props.afterSubmit) props.afterSubmit(resp);
    } else {
      setErrorMessage(resp.data.message);
      setErrors(resp.data.errors);
    }
  };

  return (
    <Paper elevation={10}>
      {isLoading ? <LinearProgress /> : false}
      <Box padding={3}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {id ? name || "Loading..." : "Tambah Perusahaan"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                label="Nama"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
                error={"name" in errors}
                helperText={"name" in errors ? errors.name : null}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Alamat"
                fullWidth
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Website"
                fullWidth
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="API Key"
                fullWidth
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                className={classes.textField}
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Simpan
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => history.push("/company")}
                disabled={isLoading}
              >
                Kembali
              </Button>

              {Boolean(errorMessage) ? (
                <Typography component="span" color="error">
                  Error: {errorMessage}
                </Typography>
              ) : (
                false
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}
