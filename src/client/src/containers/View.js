import { Box, Typography, Grid } from "@material-ui/core";
import { ExitToApp, Public } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Card from "../components/Card";
import ButtonProgress from "../components/ButtonProgress";
import { setDocumentTitle } from "../store/Common/actions";
import { getData } from "../store/View/actions";
import { logout } from "../store/Auth/actions";

const View = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDocumentTitle("View"));
  });

  const auth = useSelector((state) => state.Auth.auth);
  const loading = useSelector((state) => state.Common.loading) || false;
  const data = useSelector((state) => state.View.data);

  let redirect = null;
  if (!auth.check) {
    redirect = <Redirect to="/login" />;
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {redirect}
      <Card
        actions={
          <Box flexDirection="column" width="100%">
            <ButtonProgress
              loading={loading}
              text={"Logout"}
              icon={<ExitToApp />}
              fullWidth
              action={handleLogout}
              color="secondary"
            />
          </Box>
        }
        content={
          data && (
            <Grid container direction="column">
              <Box mb={3.9}>
                Name:
                <Box ml={2}>
                  <Typography variant="h6" display="block">
                    {data.name}
                  </Typography>
                </Box>
              </Box>
              <Box mb={3.9}>
                Age:
                <Box ml={2}>
                  <Typography variant="h6" display="block">
                    {data.age}
                  </Typography>
                </Box>
              </Box>
              <Box mb={3.9}>
                Score:
                <Box ml={2}>
                  <Typography variant="h6" display="block">
                    {data.score}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )
        }
        icon={<Public />}
        title="Satoshi"
        subTitle="Profile"
      />
    </>
  );
};

export default View;
