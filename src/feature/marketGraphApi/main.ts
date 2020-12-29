import yahooFinanceMarketApi from './yahooFinanceMarketApi';
import sp500Data from '../../../devData/yahoo_finance_market_history/sp500_10y_daily.json';
import btcData from '../../../devData/yahoo_finance_market_history/btc-usd_10y_daily.json';

const main = async () => {
  const ticker = 'AGG';
  const data = await yahooFinanceMarketApi.chartQuery(ticker, {
    range: yahooFinanceMarketApi.RANGE['10y'],
    interval: yahooFinanceMarketApi.INTERVAL.monthly,
  });

  console.log(JSON.stringify(data));

  // const { timestamp, indicators } = sp500Data[0];
  // const date = timestamp.map((ts) => {
  //   const date = new Date(ts * 1000);
  //   return date.toISOString().split('T')[0];
  // });
  // const price = indicators.quote[0].close;

  // const { timestamp, indicators } = btcData[0];
  // const date = timestamp.map((ts) => {
  //   const date = new Date(ts * 1000);
  //   const hour = date.getUTCHours();
  //   if (24 - hour < 2) {
  //     date.setUTCHours(24, 0, 0, 0);
  //   }
  //   return date.toISOString().split('T')[0];
  // });
  // const price = indicators.quote[0].close;
  // console.log(date);

  // const rawData = [sp500Data, btcData];
  // const scale = [0.5, 0.5];
  // const data = rawData.reduce<Record<string, any>>((accu, fundData, i) => {
  //   const { timestamp, indicators } = fundData[0];
  //   timestamp.forEach((ts, ind) => {
  //     if (ind < timestamp.length - 1) {
  //       const date = new Date(ts * 1000);
  //       const hour = date.getUTCHours();
  //       if (24 - hour < 2) {
  //         date.setUTCHours(24, 0, 0, 0);
  //       }
  //       const dateString = date.toISOString().split('T')[0];
  //       const price = indicators.quote[0].close[ind] * scale[i];
  //       accu[dateString] = {
  //         ...accu[dateString],
  //         date: dateString,
  //         [i]: price,
  //       };
  //     }
  //   });
  //   return accu;
  // }, {});

  // console.log(
  //   Object.values(data)
  //     .filter((datum) => Object.keys(datum).length === rawData.length + 1)
  //     .sort((a, b) => b.date - a.date)
  // );
  // console.log(data);
  // const shortestLength = data.reduce((minLength, fundData) => {
  //   return Math.min(minLength, fundData.length);
  // }, Number.MAX_SAFE_INTEGER);
  // const shortenedData = data.map((fundData) => fundData.slice(fundData.length - shortestLength));
  // console.log(shortenedData[0].length, shortenedData[1].length);
};

export default main;
