import React from "react";
import axios from "axios";
import { API_URL } from "../config.js";

export const AuthContext = React.createContext({
  isAmnesia: true,
  isLogged: false,
  user: null,
  isLoginError: false,
  loginErrorMessage: "",
  login: () => {},
  logout: () => {},
  selectCompany: () => {}
});

export function useAuth() {
  const [isAmnesia, setAmnesia] = React.useState(true); // forget who is the current user
  const [isLogged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isLoginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  const whoami = () => {
    const url = API_URL + "/users/whoami";
    axios.get(url).then(response => {
      if (response.data.result) {
        setAmnesia(false);
        setLogged(true);
        setUser(response.data.user);
      } else {
        setAmnesia(false);
        setLogged(false);
      }
    });
  };

  const login = (username, password) => {
    setLoginError(false);
    setLoginErrorMessage("");
    const url = API_URL + "/users/login";
    axios
      .post(url, { username: username, password: password })
      .then(response => {
        if (response.data.result) {
          setUser(response.data.user);
          setLogged(true);
        } else {
          setLoginError(true);
          setLoginErrorMessage(response.data.message);
        }
      });
  };

  const logout = () => {
    const url = API_URL + "/users/logout";
    axios.get(url).then(response => {
      setLogged(false);
      setUser(null);
    });
  };

  const selectCompany = company_id => {
    const url = API_URL + "/users/select-company";
    axios.post(url, { company_id: company_id }).then(response => {
      if (response.data.result) {
        setUser(response.data.user);
      }
    });
  };

  React.useEffect(() => {
    if (isAmnesia) whoami();
  });

  return {
    isAmnesia,
    isLogged,
    user,
    isLoginError,
    loginErrorMessage,
    login,
    logout,
    selectCompany
  };
}
