import { FC, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Decimal } from 'decimal.js';
import csvStringify, { Options } from 'csv-stringify';
import { css } from '@emotion/react';
import rem from 'utils/styles/rem';
import transition from 'utils/styles/transition';
import sp500Data from '../../../../devData/yahoo_finance_market_history/sp500_10y_daily.json';
import btcData from '../../../../devData/yahoo_finance_market_history/btc-usd_10y_daily.json';
// import gbtcData from '../../../../devData/yahoo_finance_market_history/gbtc_10y_daily.json';
import aggData from '../../../../devData/yahoo_finance_market_history/agg_10y_daily.json';
import ffgcxData from '../../../../devData/yahoo_finance_market_history/ffgcx_10y_daily.json';
// import indsData from '../../../../devData/yahoo_finance_market_history/inds_10y_daily.json';
import vnqData from '../../../../devData/yahoo_finance_market_history/vnq_10y_daily.json';
import ringData from '../../../../devData/yahoo_finance_market_history/ring_10y_daily.json';
import susaData from '../../../../devData/yahoo_finance_market_history/susa_10y_daily.json';

const buttonStyles = css`
  padding: ${rem(4)} ${rem(8)};
  border-radius: ${rem(10)};
  cursor: pointer;
  border: ${rem(2)} solid #4caf50;
  ${transition(100)('all')};
  font-size: ${rem(16)};
  margin: ${rem(10)} ${rem(20)};

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
  border: ${rem(2)} dotted black;
  padding: ${rem(4)} ${rem(8)};
  font-size: ${rem(16)};
  margin: ${rem(10)} ${rem(20)};

  &:link {
    color: black;
  }
  &:active,
  &:hover {
    color: blue;
  }
`;

const rawData = [
  sp500Data,
  btcData,
  aggData,
  ffgcxData,
  vnqData,
  ringData,
  susaData,
];
const dataName = [
  'S&P 500',
  'BTC',
  'AGG',
  'FFGCX',
  'VNQ',
  'RING',
  'SUSA',
  'Allio',
];
const allioAllocation = [
  new Decimal(3).dividedBy(7),
  new Decimal(1).dividedBy(7),
  new Decimal(0).dividedBy(7),
  new Decimal(0).dividedBy(7),
  new Decimal(1).dividedBy(7),
  new Decimal(1).dividedBy(7),
  new Decimal(1).dividedBy(7),
];
const allioInitialValue = 100;
const scale = [0.003, 0.001, 0.25, 1.5, 1, 0.7, 1, 0.01];
const show = [0, 1, 7];
const data = rawData.reduce<Record<string, any>>((accu, assetData, i) => {
  const { timestamp, indicators } = assetData[0];
  timestamp.forEach((ts, ind) => {
    if (ind < timestamp.length - 1) {
      const date = new Date(ts * 1000);
      const hour = date.getUTCHours();
      if (24 - hour < 2) {
        date.setUTCHours(24, 0, 0, 0);
      }
      const dateString = date.toISOString().split('T')[0];
      const price = new Decimal(indicators.quote[0].close[ind]);
      accu[dateString] = {
        ...accu[dateString],
        date: dateString,
        [`${i}-actual`]: price,
        [`${i}-scaled`]: price.times(scale[i]),
      };
    }
  });
  return accu;
}, {});

const startDate = '2015-06-01';
const shortenedData = Object.values(data)
  .filter(
    (datum) =>
      datum.date >= startDate &&
      (Object.keys(datum).length - 1) / 2 === rawData.length
  )
  .sort((a, b) => b.date - a.date);

const initialData = Array.from<unknown, Decimal>(
  {
    length: (Object.keys(shortenedData[0]).length - 1) / 2,
  },
  (_, i) => shortenedData[0][`${i}-actual`]
);

const dataWithAllio = shortenedData.map((datum) => {
  const growthFromBeginning = initialData.reduce<Decimal>(
    (accu, initialValue, ind) => {
      return accu.plus(
        (datum[`${ind}-actual`] as Decimal)
          ?.dividedBy(initialValue)
          .times(allioAllocation[ind]) ?? 0
      );
    },
    new Decimal(0)
  );
  const allioPrice = growthFromBeginning.times(allioInitialValue);
  const allioIndex = initialData.length;
  return {
    ...datum,
    [`${allioIndex}-actual`]: allioPrice,
    [`${allioIndex}-scaled`]: allioPrice.times(scale[allioIndex]),
  };
});

const getColumnsOption = (dataName: string[], show: number[]) => {
  const columnsOption = show.map((dataSwitch) => ({
    key: `${dataSwitch}-scaled`,
    header: dataName[dataSwitch],
  }));
  columnsOption.unshift({ key: 'date', header: 'date' });
  return columnsOption;
};

const generateCsvUrl = ({
  data,
  columns,
}: {
  data: any[];
  columns: Options['columns'];
}) =>
  new Promise<string>((resolve, reject) => {
    let csvData = '';
    const csvStringifier = csvStringify({
      header: true,
      columns,
    });
    csvStringifier.on('readable', () => {
      let row;
      while ((row = csvStringifier.read())) {
        csvData += row;
      }
    });
    csvStringifier.on('error', (err) => {
      reject(err);
    });
    csvStringifier.on('finish', () => {
      resolve(
        URL.createObjectURL(
          new Blob([csvData], {
            type: 'text/csv;encoding:utf-8',
          })
        )
      );
    });
    data.forEach((datum) => csvStringifier.write(datum));
    csvStringifier.end();
  });

const DynamicGraph = dynamic(() => import('./Graph_'), { ssr: false });

const MarketGraph: FC = () => {
  const [csvUrl, setCsvUrl] = useState('');

  const handleGenerateCsvClick = useCallback(() => {
    generateCsvUrl({
      data: dataWithAllio,
      columns: getColumnsOption(dataName, show),
    }).then((url) => {
      setCsvUrl(url);
    });
  }, [dataName, dataWithAllio, setCsvUrl]);

  return (
    <div>
      <DynamicGraph data={dataWithAllio} dataName={dataName} show={show} />
      <div>
        <button
          css={buttonStyles}
          type="button"
          onClick={handleGenerateCsvClick}
        >
          Generate CSV
        </button>
        {csvUrl && (
          <a css={downloadLinkStyles} download="assetData.csv" href={csvUrl}>
            Download CSV
          </a>
        )}
      </div>
    </div>
  );
};

export default MarketGraph;
