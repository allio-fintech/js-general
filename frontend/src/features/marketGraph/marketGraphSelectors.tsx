import { GlobalMarketGraphState } from 'features/marketGraph/marketGraphSlice';

export const globalSelectYahooFinanceDataLoading = (
  state: GlobalMarketGraphState
) => state.marketGraph.rawYahooFinanceData.loading;

export const globalSelectYahooFinanceDataErrorMessage = (
  state: GlobalMarketGraphState
) => state.marketGraph.rawYahooFinanceData.errorMessage;

export const globalSelectMarketGraphTicker = (state: GlobalMarketGraphState) =>
  state.marketGraph.ticker;

export const globalSelectMarketGraphInitialFund = (
  state: GlobalMarketGraphState
) => state.marketGraph.initialFund;

export const globalSelectMarketGraphInitialDate = (
  state: GlobalMarketGraphState
) => state.marketGraph.initialDate;

export const globalSelectMarketGraphFinalDate = (
  state: GlobalMarketGraphState
) => state.marketGraph.finalDate;

export const globalSelectRawYahooFinanceData = (
  state: GlobalMarketGraphState
) => state.marketGraph.rawYahooFinanceData;

export const globalSelectMarketGraphDisplayOptions = (
  state: GlobalMarketGraphState
) => state.marketGraph.graphDisplayOptions;

export const globalSelectAllioAllocation = (state: GlobalMarketGraphState) =>
  state.marketGraph.allioAllocation;
