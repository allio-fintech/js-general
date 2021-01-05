import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'features/redux/store';
import { FC, FormEvent, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import rem from 'utils/styles/rem';
import transition from 'utils/styles/transition';
import assetDataEntityAdapter from './assetDataEntityAdapter';
import fetchMarketDataByTickerThunk from './fetchMarketDataByTickerThunk';
import generateCsvUrlThrunk from './generateCsvUrlThrunk';
import {
  globalSelectYahooFinanceDataLoading,
  globalSelectYahooFinanceDataErrorMessage,
  globalSelectMarketGraphTicker,
  globalSelectMarketGraphInitialDate,
  globalSelectMarketGraphInitialFund,
  globalSelectRawYahooFinanceData,
  globalSelectMarketGraphDisplayOptions,
  globalSelectMarketGraphFinalDate,
  globalSelectAllioAllocation,
  globalSelectMarketGraphCsvUrl,
  globalSelectMarketGraphData,
} from './marketGraphSelectors';
import {
  addGraphDisplayOption,
  changeInitialDate,
  changeFinalDate,
  changeInitialFund,
  changeTicker,
  parseMarketCloseData,
  updateGraphDisplayOption,
  updateAllioAllocationProportion,
  addAllioAllocationAsset,
  generateMarketGraphData,
} from './marketGraphSlice';
import rawYahooFinanceChartDataEntityAdapter from './rawYahooFinanceChartDataEntityAdapter';
import datePriceDataEntityAdapter from './datePriceDataEntityAdapter';

const buttonStyles = css`
  padding: ${rem(4)} ${rem(8)};
  border-radius: ${rem(10)};
  cursor: pointer;
  border: ${rem(2)} solid #4caf50;
  ${transition(100)('all')};
  font-size: ${rem(16)};
  margin: ${rem(10)} ${rem(20)};
  outline: None;

  &:hover {
    background-color: #4caf50;
    color: white;
    box-shadow: 0 ${rem(12)} ${rem(16)} 0 rgba(0, 0, 0, 0.24),
      0 ${rem(17)} ${rem(50)} 0 rgba(0, 0, 0, 0.19);
  }

  &:active {
    background-color: white;
    color: black;
    box-shadow: 0 ${rem(3)} ${rem(4)} 0 rgba(0, 0, 0, 0.24),
      0 ${rem(4)} ${rem(13)} 0 rgba(0, 0, 0, 0.19);
  }
`;

const downloadLinkStyles = css`
  display: block;
  max-width: ${rem(150)};
  border: ${rem(2)} dotted black;
  padding: ${rem(4)} ${rem(8)};
  font-size: ${rem(16)};
  margin: ${rem(10)} auto;
  text-align: center;

  &:link {
    color: black;
  }
  &:active,
  &:hover {
    color: blue;
  }
`;

const {
  selectEntities: globalSelectRawYahooFinanceEntities,
} = rawYahooFinanceChartDataEntityAdapter.getSelectors(
  globalSelectRawYahooFinanceData
);

const {
  selectAll: globalSelectMarketGraphDisplayOptionArray,
} = assetDataEntityAdapter.getSelectors(globalSelectMarketGraphDisplayOptions);

const {
  selectEntities: globalSelectAllioAllocationEntities,
} = assetDataEntityAdapter.getSelectors(globalSelectAllioAllocation);

const {
  selectAll: globalSelectMarketGraphDataArray,
} = datePriceDataEntityAdapter.getSelectors(globalSelectMarketGraphData);

const DynamicGraph = dynamic(() => import('./Graph'), { ssr: false });

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
  const colors = graphOptionArray.reduce<Record<string, string>>(
    (accu, graphOption) => ({
      ...accu,
      [graphOption.assetType]: graphOption.data.color,
    }),
    {}
  );
  const allioAllocationEntities = useSelector(
    globalSelectAllioAllocationEntities
  );
  const csvUrl = useSelector(globalSelectMarketGraphCsvUrl);
  const marketGraphDataArray = useSelector(globalSelectMarketGraphDataArray);

  const handleTickerAdd = async (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (yahooFinanceDataLoading || rawYahooFinanceEntities[ticker]) {
      return;
    }
    try {
      const response = await dispatch(fetchMarketDataByTickerThunk(ticker));
      const chartData = unwrapResult(response);
      if (!chartData.length) {
        throw new Error('no chart data is fetched');
      }
      const { symbol } = chartData[0].meta;
      dispatch(parseMarketCloseData(chartData[0]));
      dispatch(addGraphDisplayOption(symbol));
      dispatch(addAllioAllocationAsset(symbol));
      dispatch(changeTicker(''));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateGraphTrigger = async (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch(generateMarketGraphData());
    dispatch(generateCsvUrlThrunk());
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
      <form onSubmit={handleGenerateGraphTrigger}>
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
        <br />
        {graphOptionArray.map((graphOption) => {
          const { assetType } = graphOption;
          const allioAllocation = allioAllocationEntities[assetType];
          const graphOptionId = `${assetType}-graph-option`;
          const showId = `${assetType}-show`;
          const colorId = `${assetType}-color`;
          const allioAllocationId = `${assetType}-allio-allocation`;
          const numeratorId = `${assetType}-numerator`;
          const denominatorId = `${assetType}-denominator`;
          return (
            <Fragment key={graphOptionId}>
              <div>{assetType}</div>
              <input
                type="checkbox"
                id={showId}
                name={showId}
                checked={graphOption.data.show}
                onChange={(event) => {
                  dispatch(
                    updateGraphDisplayOption({
                      assetType,
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
                  disabled={!graphOption.data.show}
                  value={graphOption.data.color}
                  onChange={(event) => {
                    dispatch(
                      updateGraphDisplayOption({
                        assetType,
                        show: graphOption.data.show,
                        color: event.target.value,
                      })
                    );
                  }}
                />
              </label>
              {allioAllocation && (
                <Fragment key={allioAllocationId}>
                  <br />
                  <label>
                    Allio Allocation:
                    <input
                      type="text"
                      id={numeratorId}
                      name={numeratorId}
                      value={allioAllocation.data.numerator}
                      onChange={(event) => {
                        dispatch(
                          updateAllioAllocationProportion({
                            assetType,
                            numerator: event.target.value,
                            denominator: allioAllocation.data.denominator,
                          })
                        );
                      }}
                    />
                    /
                    <input
                      type="text"
                      id={denominatorId}
                      name={denominatorId}
                      value={allioAllocation.data.denominator}
                      onChange={(event) => {
                        dispatch(
                          updateAllioAllocationProportion({
                            assetType,
                            numerator: allioAllocation.data.numerator,
                            denominator: event.target.value,
                          })
                        );
                      }}
                    />
                  </label>
                </Fragment>
              )}
            </Fragment>
          );
        })}
        <br />
        <input
          css={buttonStyles}
          type="submit"
          value="Generate Grpah"
          onSubmit={handleGenerateGraphTrigger}
        />
      </form>
      <DynamicGraph data={marketGraphDataArray} colors={colors} />
      {csvUrl && (
        <a css={downloadLinkStyles} download="assetData.csv" href={csvUrl}>
          Download CSV
        </a>
      )}
    </div>
  );
};

export default MarketGraph;
