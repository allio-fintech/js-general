import { FC } from 'react';
import { Decimal } from 'decimal.js';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import sp500Data from '../../../../devData/yahoo_finance_market_history/sp500_10y_daily.json';
import gbtcData from '../../../../devData/yahoo_finance_market_history/gbtc_10y_daily.json';
import aggData from '../../../../devData/yahoo_finance_market_history/agg_10y_daily.json';
import ffgcxData from '../../../../devData/yahoo_finance_market_history/ffgcx_10y_daily.json';
import indsData from '../../../../devData/yahoo_finance_market_history/inds_10y_daily.json';
import ringData from '../../../../devData/yahoo_finance_market_history/ring_10y_daily.json';
import susaData from '../../../../devData/yahoo_finance_market_history/susa_10y_daily.json';

const colors = [
  'red',
  'aqua',
  'blue',
  'orange',
  'green',
  'grey',
  'black',
  'pink',
];
const rawData = [
  sp500Data,
  gbtcData,
  aggData,
  ffgcxData,
  indsData,
  ringData,
  susaData,
];
const dataName = [
  'S&P 500',
  'GBTC',
  'AGG',
  'FFGCX',
  'INDS',
  'RING',
  'SUSA',
  'Allio',
];
const scale = [0.02, 4, 0.25, 1.5, 1, 0.7, 1];
const data = rawData.reduce<Record<string, any>>((accu, fundData, i) => {
  const { timestamp, indicators } = fundData[0];
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

const startDate = '2010-01-01';
const shortenedData = Object.values(data)
  .filter((datum) => datum.date > startDate)
  .sort((a, b) => b.date - a.date);

const MarketGraph: FC = () => {
  return (
    <div>
      <LineChart width={800} height={400} data={shortenedData}>
        <XAxis dataKey="date" />
        <YAxis hide />
        <Tooltip
          formatter={(_1, _2, payload) => {
            const index = `${payload.dataKey}`.split('-')[0];
            const newLableName = `${index}-actual`;
            return payload.payload[newLableName].toFixed(2);
          }}
        />
        <Legend />
        {dataName.map((fundName, i) => (
          <Line
            key={fundName}
            dataKey={`${i}-scaled`}
            dot={false}
            name={fundName}
            stroke={colors[i]}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default MarketGraph;
