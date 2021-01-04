import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'features/redux/store';
import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import {
  globalSelectYahooFinanceDataLoading,
  globalSelectYahooFinanceDataErrorMessage,
} from './marketGraphSelectors';
import { parseMarketCloseData } from './marketGraphSlice';

const MarketGraph: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const yahooFinanceDataLoading = useSelector(
    globalSelectYahooFinanceDataLoading
  );
  const yahooFinanceDataErrorMessage = useSelector(
    globalSelectYahooFinanceDataErrorMessage
  );
  const [tickerInput, setTickerInput] = useState('');

  const handleTickerAdd = async (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const asyncFunc = async () => {
      if (yahooFinanceDataLoading) {
        return;
      }
      try {
        const ticker = tickerInput;
        const response = await dispatch(fetchMarketDataByTickerThunk(ticker));
        const chartData = unwrapResult(response);
        if (!chartData.length) {
          throw new Error('no chart data is fetched');
        }
        dispatch(parseMarketCloseData(chartData[0]));
        setTickerInput('');
      } catch (err) {
        console.error(err);
      }
    };
    return asyncFunc();
  };

  return (
    <div>
      <form onSubmit={handleTickerAdd}>
        <label>
          Ticker to add:
          <input
            type="text"
            name="ticker"
            value={tickerInput}
            onChange={(event) => {
              setTickerInput(event.target.value);
            }}
          />
        </label>
        <input type="submit" value="Add" onSubmit={handleTickerAdd} />
        {yahooFinanceDataLoading && <p>loading</p>}
        {yahooFinanceDataErrorMessage && <p>{yahooFinanceDataErrorMessage}</p>}
      </form>
    </div>
  );
};

export default MarketGraph;
