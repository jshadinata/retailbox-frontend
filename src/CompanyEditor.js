import React from "react";
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
  LinearProgress
} from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import ClearIcon from "@material-ui/icons/Clear";
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
  const [hasOwnerKey, setHasOwnerKey] = React.useState(true);
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

      // check has owner key
      const hok = c.users[0]._joinData.user_rights.includes(":0:");
      setHasOwnerKey(hok);

      // company fields
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

  const handleClearApiKey = e => {
    setApiKey("");
  };

  const handleRandomApiKey = e => {
    // random token
    const tokenLength = 64;
    let token = "";
    while (token.length < tokenLength) {
      token += Math.random()
        .toString(36) // to base-36
        .substr(2); // remove 0.
    }
    token = token.substr(0, tokenLength);
    setApiKey(token);
  };

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
      if ("errors" in resp.data) setErrors(resp.data.errors);
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
                disabled={!hasOwnerKey || isLoading}
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
                disabled={!hasOwnerKey || isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={classes.textField}
                disabled={!hasOwnerKey || isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={classes.textField}
                disabled={!hasOwnerKey || isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Website"
                fullWidth
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className={classes.textField}
                disabled={!hasOwnerKey || isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                className={classes.textField}
                fullWidth
                disabled={!hasOwnerKey || isLoading}
                error={"api_key" in errors}
                helperText={"api_key" in errors ? errors.api_key : null}
              >
                <InputLabel>API Key</InputLabel>
                <Input
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={!hasOwnerKey || isLoading}
                        onClick={handleClearApiKey}
                      >
                        <ClearIcon />
                      </IconButton>
                      <IconButton
                        disabled={!hasOwnerKey || isLoading}
                        onClick={handleRandomApiKey}
                      >
                        <CasinoIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {"api_key" in errors ? (
                  <FormHelperText>{errors.api_key}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                onClick={handleSubmit}
                disabled={!hasOwnerKey || isLoading}
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
