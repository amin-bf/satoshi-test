import { makeStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  Wrapper: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "#0005",
    top: 0,
    left: 0,
  },
  Inner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  Progress: {
    color: teal[900],
  },
}));

export default useStyles;
