import { createSlice } from '@reduxjs/toolkit';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import rawYahooFinanceChartDataEntityAdapter from './rawYahooFinanceChartDataEntityAdapter';
/* eslint-disable no-param-reassign */

const rawYahooFinanceDataInitialState = rawYahooFinanceChartDataEntityAdapter.getInitialState(
  { loading: false, errorMessage: '' }
);

interface MarketGraphState {
  rawYahooFinanceData: typeof rawYahooFinanceDataInitialState;
}

export interface GlobalMarketGraphState {
  marketGraph: MarketGraphState;
}

const marketGraphSlice = createSlice({
  name: 'marketGraph',
  initialState: {
    rawYahooFinanceData: rawYahooFinanceDataInitialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarketDataByTickerThunk.fulfilled, (state, action) => {
      state.rawYahooFinanceData.loading = false;
      state.rawYahooFinanceData.errorMessage = '';
      rawYahooFinanceChartDataEntityAdapter.upsertOne(
        state.rawYahooFinanceData,
        action.payload[0]
      );
    });
    builder.addCase(fetchMarketDataByTickerThunk.pending, (state) => {
      state.rawYahooFinanceData.loading = true;
      state.rawYahooFinanceData.errorMessage = '';
    });
    builder.addCase(fetchMarketDataByTickerThunk.rejected, (state, action) => {
      console.error(action.error);
      state.rawYahooFinanceData.errorMessage = action.error.message;
      state.rawYahooFinanceData.loading = false;
    });
  },
});

export default marketGraphSlice.reducer;
