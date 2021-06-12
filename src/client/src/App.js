import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./app.css";
import Switch from "./components/Switch";
import * as authActions from "./store/Auth/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.initiateInitialAuthCheck());
  }, [dispatch]);

  const documentTitle = useSelector((state) => state.Common.documentTitle);
  useEffect(() => {
    document.querySelector("title").innerText = documentTitle;
  }, [documentTitle]);

  return (
    <Router>
      <Switch />
    </Router>
  );
}

export default App;
