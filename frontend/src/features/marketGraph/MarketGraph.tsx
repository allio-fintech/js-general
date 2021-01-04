import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'features/redux/store';
import { FC, FormEvent, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import assetDataEntityAdapter from './assetDataEntityAdapter';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import {
  globalSelectYahooFinanceDataLoading,
  globalSelectYahooFinanceDataErrorMessage,
  globalSelectMarketGraphTicker,
  globalSelectMarketGraphInitialDate,
  globalSelectMarketGraphInitialFund,
  globalSelectRawYahooFinanceData,
  globalSelectMarketGraphDisplayOptions,
  globalSelectMarketGraphFinalDate,
} from './marketGraphSelectors';
import {
  addGraphDisplayOption,
  changeInitialDate,
  changeFinalDate,
  changeInitialFund,
  changeTicker,
  parseMarketCloseData,
  updateGraphDisplayOption,
} from './marketGraphSlice';
import rawYahooFinanceChartDataEntityAdapter from './rawYahooFinanceChartDataEntityAdapter';

const {
  selectEntities: globalSelectRawYahooFinanceEntities,
} = rawYahooFinanceChartDataEntityAdapter.getSelectors(
  globalSelectRawYahooFinanceData
);

const {
  selectAll: globalSelectMarketGraphDisplayOptionArray,
} = assetDataEntityAdapter.getSelectors(globalSelectMarketGraphDisplayOptions);

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
  const finalDate = useSelector(globalSelectMarketGraphFinalDate);
  const initialFund = useSelector(globalSelectMarketGraphInitialFund);
  const rawYahooFinanceEntities = useSelector(
    globalSelectRawYahooFinanceEntities
  );
  const graphOptionArray = useSelector(
    globalSelectMarketGraphDisplayOptionArray
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
        dispatch(addGraphDisplayOption(ticker));
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
        <br />
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
        <label>
          Final Date:
          <input
            type="text"
            name="finalDate"
            value={finalDate}
            onChange={(event) => {
              dispatch(changeFinalDate(event.target.value));
            }}
          />
        </label>
        <input type="submit" value="Apply" onSubmit={handleInitialDataApply} />
      </form>
      <form>
        {graphOptionArray.map((graphOption) => {
          const key = `${graphOption.assetType}-graph-option`;
          const showId = `${graphOption.assetType}-show`;
          const colorId = `${graphOption.assetType}-color`;
          return (
            <Fragment key={key}>
              <div>{graphOption.assetType}</div>
              <input
                type="checkbox"
                id={showId}
                name={showId}
                checked={graphOption.data.show}
                onChange={(event) => {
                  dispatch(
                    updateGraphDisplayOption({
                      assetType: graphOption.assetType,
                      show: event.target.checked,
                      color: graphOption.data.color,
                    })
                  );
                }}
              />
              <label htmlFor={showId}>show</label>
              <br />
              <label>
                color:
                <input
                  type="text"
                  id={colorId}
                  name={colorId}
                  value={graphOption.data.color}
                  onChange={(event) => {
                    dispatch(
                      updateGraphDisplayOption({
                        assetType: graphOption.assetType,
                        show: graphOption.data.show,
                        color: event.target.value,
                      })
                    );
                  }}
                />
              </label>
            </Fragment>
          );
        })}
      </form>
    </div>
  );
};

export default MarketGraph;
