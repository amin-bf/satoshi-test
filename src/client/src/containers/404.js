import { Box, Link, Typography } from "@material-ui/core";
import Card from "../components/Card";
import { Link as RouterLink } from "react-router-dom";
import { LinkOff } from "@material-ui/icons";

const NotFound = () => {
  return (
    <Card
      actions={
        <Box textAlign="center" mt={5}>
          <Link component={RouterLink} to="/">
            Back to home
          </Link>
        </Box>
      }
      content={
        <Box textAlign="center">
          <Typography variant="h1" display="block">
            404
          </Typography>
          <Typography variant="body1" display="block">
            Page does not exist.
          </Typography>
        </Box>
      }
      icon={LinkOff}
    />
  );
};

export default NotFound;
