import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import {
  TRADER_DETAIL,
  TRADER_REQUESTS,
  TRADER_HISTORY
} from "../actions/trader-actions.constants";

const traderReducer = combineReducers({
  traderDetail: apiReducerFactory({ apiType: TRADER_DETAIL }),
  requests: apiReducerFactory({ apiType: TRADER_REQUESTS }),
  history: apiReducerFactory({ apiType: TRADER_HISTORY })
});

export default traderReducer;