import yahooFinanceMarketApi from './yahooFinanceMarketApi';

const main = async () => {
  const ticker = '^GSPC';
  const data = await yahooFinanceMarketApi.chartQuery(ticker, {
    range: yahooFinanceMarketApi.RANGE.max,
    interval: yahooFinanceMarketApi.INTERVAL.daily,
  });

  console.log(JSON.stringify(data));
};

export default main;
