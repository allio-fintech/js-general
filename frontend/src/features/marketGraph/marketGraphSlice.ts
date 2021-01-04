import { createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Decimal } from 'decimal.js';
import { approximateUTCDateString, timestampToDate } from 'features/date/util';
import { YahooFinanceChartData } from 'features/marketHistoryQuery/yahooFinanceMarketApi';
import datePriceDataEntityAdapter, {
  DatePriceDatum,
} from './datePriceDataEntityAdapter';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import rawYahooFinanceChartDataEntityAdapter from './rawYahooFinanceChartDataEntityAdapter';
import assetDataEntityAdapter from './assetDataEntityAdapter';
/* eslint-disable no-param-reassign */

const rawYahooFinanceDataInitialState = rawYahooFinanceChartDataEntityAdapter.getInitialState(
  { loading: false, errorMessage: '' }
);

interface MarketGraphState {
  ticker: string;
  initialFund: number;
  initialDate: string;
  finalDate: string;
  rawYahooFinanceData: typeof rawYahooFinanceDataInitialState;
  parsedMarketCloseData: EntityState<{
    assetType: string;
    data: EntityState<DatePriceDatum>;
  }>;
  graphDisplayOptions: EntityState<{
    assetType: string;
    data: {
      show: boolean;
      color: string;
    };
  }>;
}

export interface GlobalMarketGraphState {
  marketGraph: MarketGraphState;
}

const marketGraphSlice = createSlice({
  name: 'marketGraph',
  initialState: {
    rawYahooFinanceData: rawYahooFinanceDataInitialState,
    parsedMarketCloseData: assetDataEntityAdapter.getInitialState(),
    initialFund: 100,
    initialDate: '2010-01-01',
    finalDate: '2020-12-01',
    ticker: '',
    graphDisplayOptions: assetDataEntityAdapter.addOne(
      assetDataEntityAdapter.getInitialState(),
      {
        assetType: 'Allio',
        data: {
          show: false,
          color: 'navy',
        },
      }
    ),
  } as MarketGraphState,
  reducers: {
    parseMarketCloseData(state, action: PayloadAction<YahooFinanceChartData>) {
      const chartData = action.payload;
      const ticker = chartData.meta.symbol;
      const { timestamp, indicators } = chartData;
      if (!timestamp) {
        return;
      }

      const datePriceData = timestamp.reduce<EntityState<DatePriceDatum>>(
        (data, ts, ind) => {
          if (ind >= timestamp.length - 1) {
            return data;
          }
          const date = timestampToDate(ts);
          const dateString = approximateUTCDateString(date);
          const price =
            indicators.quote[0].close[ind] &&
            new Decimal(indicators.quote[0].close[ind]);
          return datePriceDataEntityAdapter.upsertOne(data, {
            assetType: ticker,
            id: dateString,
            date,
            price,
          });
        },
        datePriceDataEntityAdapter.getInitialState()
      );
      assetDataEntityAdapter.upsertOne(state.parsedMarketCloseData, {
        assetType: ticker,
        data: datePriceData,
      });
    },
    changeTicker(state, action: PayloadAction<string>) {
      state.ticker = action.payload;
    },
    changeInitialFund(state, action: PayloadAction<number>) {
      state.initialFund = action.payload;
    },
    changeInitialDate(state, action: PayloadAction<string>) {
      state.initialDate = action.payload;
    },
    changeFinalDate(state, action: PayloadAction<string>) {
      state.finalDate = action.payload;
    },
    addGraphDisplayOption(state, action: PayloadAction<string>) {
      assetDataEntityAdapter.upsertOne(state.graphDisplayOptions, {
        assetType: action.payload,
        data: {
          show: true,
          color: 'black',
        },
      });
    },
    updateGraphDisplayOption(
      state,
      action: PayloadAction<{ assetType: string; show: boolean; color: string }>
    ) {
      assetDataEntityAdapter.upsertOne(state.graphDisplayOptions, {
        assetType: action.payload.assetType,
        data: {
          show: action.payload.show,
          color: action.payload.color,
        },
      });
    },
  },
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
export const {
  parseMarketCloseData,
  changeInitialDate,
  changeFinalDate,
  changeInitialFund,
  changeTicker,
  addGraphDisplayOption,
  updateGraphDisplayOption,
} = marketGraphSlice.actions;
