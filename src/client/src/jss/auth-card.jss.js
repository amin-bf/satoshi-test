import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  MainWrapper: {
    minHeight: "100vh",
  },
  Media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "auto 100%",
  },
}));

export default useStyles;
