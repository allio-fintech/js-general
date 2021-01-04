import { GlobalMarketGraphState } from 'features/marketGraph/marketGraphSlice';

export const globalSelectYahooFinanceDataLoading = (
  state: GlobalMarketGraphState
) => state.marketGraph.rawYahooFinanceData.loading;

export const globalSelectYahooFinanceDataErrorMessage = (
  state: GlobalMarketGraphState
) => state.marketGraph.rawYahooFinanceData.errorMessage;
