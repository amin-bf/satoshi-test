import { CircularProgress } from "@material-ui/core";
import loadingStyles from "../jss/component-loading.jss";

const ComponentLoading = () => {
  const classes = loadingStyles();

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Inner}>
        <CircularProgress
          color="secondary"
          size={68}
          className={classes.Progress}
        />
      </div>
    </div>
  );
};

export default ComponentLoading;
