import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'features/redux/store';
import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import {
  globalSelectYahooFinanceDataLoading,
  globalSelectYahooFinanceDataErrorMessage,
  globalSelectMarketGraphTicker,
  globalSelectMarketGraphInitialDate,
  globalSelectMarketGraphInitialFund,
  globalSelectRawYahooFinanceData,
} from './marketGraphSelectors';
import {
  changeInitialDate,
  changeInitialFund,
  changeTicker,
  parseMarketCloseData,
} from './marketGraphSlice';
import rawYahooFinanceChartDataEntityAdapter from './rawYahooFinanceChartDataEntityAdapter';

const {
  selectEntities: globalSelectRawYahooFinanceEntities,
} = rawYahooFinanceChartDataEntityAdapter.getSelectors(
  globalSelectRawYahooFinanceData
);

const MarketGraph: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const yahooFinanceDataLoading = useSelector(
    globalSelectYahooFinanceDataLoading
  );
  const yahooFinanceDataErrorMessage = useSelector(
    globalSelectYahooFinanceDataErrorMessage
  );
  const ticker = useSelector(globalSelectMarketGraphTicker);
  const initialDate = useSelector(globalSelectMarketGraphInitialDate);
  const initialFund = useSelector(globalSelectMarketGraphInitialFund);
  const rawYahooFinanceEntities = useSelector(
    globalSelectRawYahooFinanceEntities
  );

  const handleTickerAdd = async (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const asyncFunc = async () => {
      if (yahooFinanceDataLoading || rawYahooFinanceEntities[ticker]) {
        return;
      }
      try {
        const response = await dispatch(fetchMarketDataByTickerThunk(ticker));
        const chartData = unwrapResult(response);
        if (!chartData.length) {
          throw new Error('no chart data is fetched');
        }
        dispatch(parseMarketCloseData(chartData[0]));
        dispatch(changeTicker(''));
      } catch (err) {
        console.error(err);
      }
    };
    return asyncFunc();
  };

  const handleInitialDataApply = async (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleTickerAdd}>
        <label>
          Ticker to add:
          <input
            type="text"
            name="ticker"
            value={ticker}
            onChange={(event) => {
              dispatch(changeTicker(event.target.value));
            }}
          />
        </label>
        <input type="submit" value="Add" onSubmit={handleTickerAdd} />
        {yahooFinanceDataLoading && <p>loading</p>}
        {yahooFinanceDataErrorMessage && <p>{yahooFinanceDataErrorMessage}</p>}
      </form>
      <form onSubmit={handleInitialDataApply}>
        <label>
          Initial Fund:
          <input
            type="number"
            name="initialFund"
            value={initialFund}
            onChange={(event) => {
              dispatch(changeInitialFund(parseInt(event.target.value, 10)));
            }}
          />
        </label>
        <label>
          Initial Date:
          <input
            type="text"
            name="initialDate"
            value={initialDate}
            onChange={(event) => {
              dispatch(changeInitialDate(event.target.value));
            }}
          />
        </label>
        <input type="submit" value="Apply" onSubmit={handleInitialDataApply} />
      </form>
    </div>
  );
};

export default MarketGraph;
