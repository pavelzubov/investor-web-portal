import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const investPopupReducer = apiReducerFactory({ apiType: "FETCH_INVEST_INFO" });

export default investPopupReducer;
