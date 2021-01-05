import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'features/redux/store';
import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { SketchPicker } from 'react-color';
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
  toggleEditColor,
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

const buttonBackgroundColor = ({
  color,
  disabled,
}: {
  color: string;
  disabled?: boolean;
}) => css`
  border-color: ${color};
  border-radius: ${rem(1)};
  padding: ${rem(2)};
  margin: 0;

  &:hover {
    background-color: ${disabled ? 'initial' : color};
    ${disabled ? 'color: lightgray' : ''};
    box-shadow: initial;
  }

  &:active {
    background-color: white;
  }
`;

const graphOptionBlockStyles = css`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
`;

const graphOptionDivStyles = css`
  display: flex;
  flex-flow: column nowrap;
  max-width: ${rem(60)};
  align-items: center;
  margin: 0 ${rem(10)};

  &.* {
    display: block;
  }
`;

const colorPickerContainerStyles = css`
  align-self: flex-start;
`;

const colorPickerStyles = css`
  position: fixed;
`;

const fractionInputStyles = css`
  display: inline-block;
  width: ${rem(20)};
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
        <div css={graphOptionBlockStyles}>
          {graphOptionArray.map((graphOption) => {
            const { assetType } = graphOption;
            const allioAllocation = allioAllocationEntities[assetType];
            const graphOptionId = `${assetType}-graph-option`;
            const showId = `${assetType}-show`;
            const allioAllocationId = `${assetType}-allio-allocation`;
            const numeratorId = `${assetType}-numerator`;
            const denominatorId = `${assetType}-denominator`;
            return (
              <div key={graphOptionId} css={graphOptionDivStyles}>
                <div>{assetType}</div>
                <label>
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
                  show
                </label>
                {!graphOption.data.editColor && (
                  <button
                    css={[
                      buttonStyles,
                      buttonBackgroundColor({
                        color: graphOption.data.color,
                        disabled: !graphOption.data.show,
                      }),
                    ]}
                    type="button"
                    disabled={!graphOption.data.show}
                    onClick={() => {
                      dispatch(toggleEditColor(assetType));
                    }}
                  >
                    color
                  </button>
                )}
                {graphOption.data.editColor && (
                  <>
                    <button
                      css={[
                        buttonStyles,
                        buttonBackgroundColor({
                          color: graphOption.data.color,
                        }),
                      ]}
                      type="button"
                      onClick={() => {
                        dispatch(toggleEditColor(assetType));
                      }}
                    >
                      done
                    </button>
                    <div css={colorPickerContainerStyles}>
                      <SketchPicker
                        css={colorPickerStyles}
                        color={graphOption.data.color}
                        onChangeComplete={(color) => {
                          dispatch(
                            updateGraphDisplayOption({
                              assetType,
                              show: graphOption.data.show,
                              color: color.hex,
                            })
                          );
                        }}
                      />
                    </div>
                  </>
                )}
                {allioAllocation && (
                  <div key={allioAllocationId}>
                    <label>
                      Allocation:
                      <input
                        css={fractionInputStyles}
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
                        css={fractionInputStyles}
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
