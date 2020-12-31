import { FC, useState } from 'react';
import yahooFinanceMarketApi from '../marketHistoryQuery/yahooFinanceMarketApi';

const fetchMarketDataByTicker = async (ticker: string) =>
  yahooFinanceMarketApi.chartQuery(ticker, {
    range: yahooFinanceMarketApi.YF_RANGE['10y'],
    interval: yahooFinanceMarketApi.YF_INTERVAL.monthly,
  });

const MarketGraph: FC = () => {
  const [tickerInput, setTickerInput] = useState('');

  return (
    <div>
      <form>
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
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default MarketGraph;
