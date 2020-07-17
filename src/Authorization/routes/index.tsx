import React from "react";
import { Route } from "react-router-dom";

import { SignInRoute } from "./SignInAppRoute";

const AuthRoutes = [
  <Route key={Math.random()} exact path={"/"} component={SignInRoute} />,
];

export { AuthRoutes };
