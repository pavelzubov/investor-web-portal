import pagingReducerFactory from "modules/paging/reducers/paging-reducers";
import sortingReducerFactory from "modules/sorting/reducers/sorting-reducers";
import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { DASHBOARD_PROGRAMS } from "../actions/dashboard.actions";
import dashboardEventsReducer from "./dashboard-events.reducer";

const dashboardReducer = combineReducers({
  eventsData: dashboardEventsReducer,
  programs: combineReducers({
    itemsData: apiReducerFactory({
      apiType: DASHBOARD_PROGRAMS
    }),
    paging: pagingReducerFactory({ type: DASHBOARD_PROGRAMS }),
    sorting: sortingReducerFactory({
      type: DASHBOARD_PROGRAMS,
      sorting: "ByProfitDesc"
    })
  })
});
export default dashboardReducer;