import {
  fetchInvestInfoById,
  investToProgram
} from "modules/invest-popup/actions/invest-popup.actions";

export const getInvestInfoById = id => (dispatch, getState) => {
  const { accountSettings } = getState();
  return dispatch(fetchInvestInfoById(id, accountSettings.currentCurrency));
};

export const investServiceInvestById = (id, amount) => dispatch => {
  return dispatch(investToProgram(id, amount));
};
