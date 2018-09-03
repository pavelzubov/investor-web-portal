import NotFoundPage from "pages/not-found/not-found.routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { GUID_REGEXP } from "../../utils/constants";
import PrivateRoute from "../private-route";
import ProgramDetailsPage from "./program-details/program-details.page";
import ProgramsFacetPage from "./programs-facet/programs-facet.page";
import ProgramsPage from "./programs/programs.page";

export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "explore";

export const PROGRAMS_ROUTE = "/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:programId`;
export const PROGRAM_DETAILS_ROUTE_REGEX = `${PROGRAMS_ROUTE}/:programId${GUID_REGEXP}`;
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/facet/:facetId`;
export const PROGRAMS_FACET_ROUTE_REGEX = `${PROGRAMS_ROUTE}/facet/:facetId([0-9])`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_EXPLORE_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_EXPLORE_TAB_NAME})`;
export const PROGRAMS_FAVORITES_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_FAVORITES_TAB_NAME})`;

const ProgramsRoutes = () => (
  <Switch>
    <Route path={PROGRAMS_EXPLORE_TAB_ROUTE} component={ProgramsPage} />
    <PrivateRoute
      path={PROGRAMS_FAVORITES_TAB_ROUTE}
      component={ProgramsPage}
    />
    <Route path={PROGRAMS_FACET_ROUTE_REGEX} component={ProgramsFacetPage} />
    <Route path={PROGRAM_DETAILS_ROUTE_REGEX} component={ProgramDetailsPage} />
    <Redirect
      exact
      from={PROGRAMS_ROUTE}
      to={`${PROGRAMS_ROUTE}/${PROGRAMS_EXPLORE_TAB_NAME}`}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default ProgramsRoutes;