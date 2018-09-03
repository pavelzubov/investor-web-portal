import investorApi from "services/api-client/investor-api";

export const PROGRAM_DETAILS = "PROGRAM_DETAILS";

export const fetchProgramDetails = ({ programId, opts }) => {
  return {
    type: PROGRAM_DETAILS,
    payload: investorApi.apiInvestorInvestmentProgramGet(programId, opts)
  };
};
