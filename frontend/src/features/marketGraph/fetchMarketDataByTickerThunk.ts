import { createAsyncThunk } from '@reduxjs/toolkit';
import yahooFinanceMarketApi from 'features/marketHistoryQuery/yahooFinanceMarketApi';

const fetchMarketDataByTickerThunk = createAsyncThunk(
  'marketGraph/fetchMakertDataByTickerStatus',
  async (ticker: string) =>
    yahooFinanceMarketApi.chartQuery(ticker, {
      range: yahooFinanceMarketApi.YF_RANGE['10y'],
      interval: yahooFinanceMarketApi.YF_INTERVAL.monthly,
    })
);

export default fetchMarketDataByTickerThunk;
