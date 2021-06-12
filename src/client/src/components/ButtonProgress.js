import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration({
  variant,
  color,
  loading,
  action,
  text,
  icon,
  fullWidth,
  disabled,
}) {
  const classes = useStyles();

  const handleButtonClick = () => {
    if (action) action();
  };

  return (
    <div className={classes.wrapper}>
      <Button
        variant={variant || "contained"}
        color={color || "primary"}
        disabled={loading || disabled}
        onClick={handleButtonClick}
        endIcon={icon || null}
        fullWidth={fullWidth}
        type={action ? "button" : "submit"}
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}
