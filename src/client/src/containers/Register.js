import { Box, Typography, Link, TextField, Grid } from "@material-ui/core";
import { VerifiedUserSharp, CheckCircle } from "@material-ui/icons";
import { Link as RouterLink, Redirect } from "react-router-dom";
import validate from "validate.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import registerMedia from "../assets/register.jpg";
import Card from "../components/Card";
import { signup, signupSetError } from "../store/Auth/actions";
import {
  ageValidationRules,
  nameValidationRules,
  passwordValidationRules,
  scoreValidationRules,
} from "../validation/register";
import ButtonProgress from "../components/ButtonProgress";
import { setDocumentTitle } from "../store/Common/actions";

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDocumentTitle("Register"));
  });

  const registerErrors = useSelector((state) => state.Auth.signupErrors) || {};
  const loading = useSelector((state) => state.Common.loading) || false;
  const auth = useSelector((state) => state.Auth.auth);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [score, setScore] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [disabled, setDisabled] = useState(false);

  let redirect = null;
  if (auth.check) {
    redirect = <Redirect to="/" />;
  }

  useEffect(() => {
    if (
      !!registerErrors.name ||
      !!registerErrors.age ||
      !!registerErrors.score ||
      !!registerErrors.password
    )
      setDisabled(true);
    else setDisabled(false);
  }, [
    registerErrors.name,
    registerErrors.age,
    registerErrors.score,
    registerErrors.password,
  ]);

  useEffect(() => {
    dispatch(
      signupSetError({
        name: "",
        age: "",
        score: "",
        password: "",
      })
    );
  }, [dispatch]);

  const nameChangeHandler = (event) => {
    const value = event.target.value;
    setName(value);
    const validationOutcome = validate({ name: value }, nameValidationRules);
    if (validationOutcome)
      dispatch(
        signupSetError({ ...registerErrors, name: validationOutcome.name[0] })
      );
    else dispatch(signupSetError({ ...registerErrors, name: "" }));
  };

  const ageChangeHandler = (event) => {
    const value = event.target.value;
    setAge(value);
    const validationOutcome = validate({ age: value }, ageValidationRules);
    if (validationOutcome)
      dispatch(
        signupSetError({ ...registerErrors, age: validationOutcome.age[0] })
      );
    else dispatch(signupSetError({ ...registerErrors, age: "" }));
  };

  const scoreChangeHandler = (event) => {
    const value = event.target.value;
    setScore(value);
    const validationOutcome = validate({ score: value }, scoreValidationRules);
    if (validationOutcome)
      dispatch(
        signupSetError({ ...registerErrors, score: validationOutcome.score[0] })
      );
    else dispatch(signupSetError({ ...registerErrors, score: "" }));
  };

  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
    const validationOutcome = validate(
      { password: value, password_confirmation: passwordConfirmation },
      passwordValidationRules
    );
    if (validationOutcome)
      dispatch(
        signupSetError({
          ...registerErrors,
          password: validationOutcome.password[0],
        })
      );
    else dispatch(signupSetError({ ...registerErrors, password: "" }));
  };

  const passwordConfirmationChangeHandler = (event) => {
    const value = event.target.value;
    setPasswordConfirmation(value);
    const validationOutcome = validate(
      { password: password, password_confirmation: value },
      passwordValidationRules
    );
    if (validationOutcome)
      dispatch(
        signupSetError({
          ...registerErrors,
          password: validationOutcome.password[0],
        })
      );
    else dispatch(signupSetError({ ...registerErrors, password: "" }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const validationOutcome = validate(
      {
        name,
        age,
        score,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        ...nameValidationRules,
        ...ageValidationRules,
        ...scoreValidationRules,
        ...passwordValidationRules,
      }
    );

    if (validationOutcome) {
      const errors = { ...registerErrors };
      Object.keys(validationOutcome).forEach((item) => {
        errors[item] = validationOutcome[item][0];
      });
      dispatch(signupSetError(errors));
    } else {
      dispatch(
        signupSetError({
          name: "",
          age: "",
          score: "",
          password: "",
        })
      );
      dispatch(
        signup({
          name,
          age,
          score,
          password,
          password_confirmation: passwordConfirmation,
        })
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {redirect}
      <Card
        actions={
          <Box flexDirection="column" width="100%">
            <ButtonProgress
              loading={loading}
              text={"Register"}
              icon={<CheckCircle />}
              fullWidth
              disabled={disabled}
            />
            <Typography component="div">
              <Box textAlign="center" fontSize={12} mt={3} mb={1}>
                Already have an account?
                <Link component={RouterLink} to="/login">
                  {" "}
                  Login
                </Link>
              </Box>
            </Typography>
          </Box>
        }
        content={
          <Grid container direction="column">
            <Box mb={!!registerErrors.name ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtName"
                label="Name"
                value={name}
                error={!!registerErrors.name}
                helperText={!!registerErrors.name ? registerErrors.name : ""}
                onChange={nameChangeHandler}
              />
            </Box>
            <Box mb={!!registerErrors.age ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtAge"
                label="Age"
                value={age}
                error={!!registerErrors.age}
                helperText={!!registerErrors.age ? registerErrors.age : ""}
                onChange={ageChangeHandler}
              />
            </Box>
            <Box mb={!!registerErrors.score ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtScore"
                label="Score"
                value={score}
                error={!!registerErrors.score}
                helperText={!!registerErrors.score ? registerErrors.score : ""}
                onChange={scoreChangeHandler}
              />
            </Box>
            <Box mb={!!registerErrors.password ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtPassword"
                label="Password"
                value={password}
                error={!!registerErrors.password}
                helperText={
                  !!registerErrors.password ? registerErrors.password : ""
                }
                onChange={passwordChangeHandler}
                type="password"
              />
            </Box>
            <Box mb={!!registerErrors.name ? 1 : 3.9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="txtPasswordConfirmation"
                label="Password Confirmation"
                value={passwordConfirmation}
                onChange={passwordConfirmationChangeHandler}
                type="password"
              />
            </Box>
          </Grid>
        }
        icon={<VerifiedUserSharp />}
        title="Satoshi"
        subTitle="Register in Satoshi"
        media={registerMedia}
      />
    </form>
  );
};

export default Register;
