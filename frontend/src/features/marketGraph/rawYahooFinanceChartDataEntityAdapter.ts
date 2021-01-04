import { createEntityAdapter } from '@reduxjs/toolkit';
import { YahooFinanceChartData } from 'features/marketHistoryQuery/yahooFinanceMarketApi';

const rawYahooFinanceChartDataEntityAdapter = createEntityAdapter<YahooFinanceChartData>(
  {
    selectId: (rawMarketData) => rawMarketData.meta.symbol,
    sortComparer: (a, b) => a.meta.symbol.localeCompare(b.meta.symbol),
  }
);

export default rawYahooFinanceChartDataEntityAdapter;
