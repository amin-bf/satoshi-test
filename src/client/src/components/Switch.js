import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import ComponentLoading from "./ComponentLoading";
import NotFound from "../containers/404";

const AsyncRegister = lazy(() => {
  return import("../containers/Register");
});

const AsyncLogin = lazy(() => {
  return import("../containers/Login");
});

const AsyncView = lazy(() => {
  return import("../containers/View");
});

const animatedSwith = (props) => {
  return (
    <>
      <Switch location={props.location}>
        <Route path="/" exact>
          <Suspense fallback={<ComponentLoading />}>
            <AsyncView />
          </Suspense>
        </Route>
        <Route path="/register" exact>
          <Suspense fallback={<ComponentLoading />}>
            <AsyncRegister />
          </Suspense>
        </Route>
        <Route path="/login" exact>
          <Suspense fallback={<ComponentLoading />}>
            <AsyncLogin />
          </Suspense>
        </Route>
        <Route path="*" exact>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default animatedSwith;
