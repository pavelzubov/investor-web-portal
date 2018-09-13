import investorApi from "services/api-client/investor-api";
import rateApi from "services/api-client/rate-api";
import authService from "services/auth-service";

export const fetchInvestInfoById = (id, currency) => {
  return {
    type: "FETCH_INVEST_INFO",
    payload: investorApi.v10InvestorProgramsByIdInvestInfoByCurrencyGet(
      id,
      currency,
      authService.getAuthArg()
    )
  };
};

export const investToProgram = (id, amount) => {
  return {
    type: "INVEST_BY_ID",
    payload: investorApi.v10InvestorProgramsByIdInvestByAmountPost(
      id,
      amount,
      authService.getAuthArg()
    )
  };
};
