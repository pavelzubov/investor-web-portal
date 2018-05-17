export const PROGRAMS_ROUTE = "/programs";

export const LEVEL_FILTER_NAME = "level";
export const AVG_PROFIT_FILTER_NAME = "profitAvg";
export const TOTAL_PROFIT_FILTER_NAME = "profitTotal";
export const AVAILABLE_INVESTMENT_FILTER_NAME = "hasAvailableInvestment";

export const LEVEL_MIN_FILTER_VALUE = 1;
export const LEVEL_MAX_FILTER_VALUE = 7;
export const AVG_PROFIT_MIN_FILTER_VALUE = -10;
export const AVG_PROFIT_MAX_FILTER_VALUE = 100;
export const TOTAL_PROFIT_MIN_FILTER_VALUE = -1000;
export const TOTAL_PROFIT_MAX_FILTER_VALUE = 100000;
export const BALANCE_MIN_FILTER_VALUE = 0;
export const BALANCE_MAX_FILTER_VALUE = 1000;
export const AVAILABLE_INVESTMENT_FILTER_VALUE = false;

export const PROGRAMS_DEFAULT_FILTERS = [
  {
    name: LEVEL_FILTER_NAME,
    value: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE]
  },
  {
    name: AVG_PROFIT_FILTER_NAME,
    value: [AVG_PROFIT_MIN_FILTER_VALUE, AVG_PROFIT_MAX_FILTER_VALUE]
  },
  {
    name: TOTAL_PROFIT_FILTER_NAME,
    value: [TOTAL_PROFIT_MIN_FILTER_VALUE, TOTAL_PROFIT_MAX_FILTER_VALUE]
  },
  /*{ name: BALANCE_MIN_FILTER_NAME, value: BALANCE_MIN_FILTER_VALUE },
  { name: BALANCE_MAX_FILTER_NAME, value: BALANCE_MAX_FILTER_VALUE },*/
  {
    name: AVAILABLE_INVESTMENT_FILTER_NAME,
    value: AVAILABLE_INVESTMENT_FILTER_VALUE
  }
];
