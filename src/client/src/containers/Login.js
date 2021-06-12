import { Box, Typography, Link, TextField, Grid } from "@material-ui/core";
import { CheckCircle, LockOpen } from "@material-ui/icons";
import { Link as RouterLink, Redirect } from "react-router-dom";
import validate from "validate.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import registerMedia from "../assets/register.jpg";
import Card from "../components/Card";
import { login, loginSetError } from "../store/Auth/actions";
import { nameValidationRules } from "../validation/login";
import ButtonProgress from "../components/ButtonProgress";
import { setDocumentTitle } from "../store/Common/actions";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDocumentTitle("Login"));
  });

  const loginErrors = useSelector((state) => state.Auth.loginErrors) || {};
  const loading = useSelector((state) => state.Common.loading) || false;
  const auth = useSelector((state) => state.Auth.auth);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  let redirect = null;
  if (auth.check) {
    redirect = <Redirect to="/" />;
  }

  useEffect(() => {
    if (!!loginErrors.name || !!loginErrors.password) setDisabled(true);
    else setDisabled(false);
  }, [loginErrors.name, loginErrors.password]);

  useEffect(() => {
    dispatch(
      loginSetError({
        name: "",
        password: "",
      })
    );
  }, [dispatch]);

  const nameChangeHandler = (event) => {
    const value = event.target.value;
    setName(value);
    const validationOutcome = validate({ name: value }, nameValidationRules);
    if (validationOutcome)
      dispatch(loginSetError({ name: validationOutcome.name[0] }));
    else dispatch(loginSetError({ name: "" }));
  };

  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    dispatch(loginSetError({ name: "" }));
    setPassword(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const validationOutcome = validate(
      {
        name,
        password,
      },
      nameValidationRules
    );

    if (validationOutcome) {
      dispatch(loginSetError({ name: validationOutcome.name[0] }));
    } else {
      dispatch(loginSetError({ name: "", password: "" }));
      dispatch(
        login({
          name,
          password,
        })
      );
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {redirect}
      <Card
        actions={
          <Box flexDirection="column" width="100%">
            <ButtonProgress
              loading={loading}
              text={"Login"}
              icon={<CheckCircle />}
              fullWidth
              disabled={disabled}
            />
            <Typography component="div">
              <Box textAlign="center" fontSize={12} mt={3} mb={1}>
                Do not have an account?
                <Link component={RouterLink} to="/register">
                  {" "}
                  Register
                </Link>
              </Box>
            </Typography>
          </Box>
        }
        content={
          <Grid container direction="column">
            <Box mb={!!loginErrors.name ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtName"
                label="Name"
                value={name}
                error={!!loginErrors.name}
                helperText={!!loginErrors.name ? loginErrors.name : ""}
                onChange={nameChangeHandler}
              />
            </Box>
            <Box mb={!!loginErrors.password ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtPassword"
                label="Password"
                value={password}
                error={!!loginErrors.password}
                helperText={!!loginErrors.password ? loginErrors.password : ""}
                onChange={passwordChangeHandler}
                type="password"
              />
            </Box>
          </Grid>
        }
        icon={<LockOpen />}
        title="Satoshi"
        subTitle="Account login"
        media={registerMedia}
      />
    </form>
  );
};

export default Login;
