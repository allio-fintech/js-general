/* eslint-disable no-shadow */
import axios from 'axios';

enum YF_RANGE {
  '1d' = '1d',
  '5d' = '5d',
  '1mo' = '1mo',
  '3mo' = '3mo',
  '6mo' = '6mo',
  '1y' = '1y',
  '2y' = '2y',
  '5y' = '5y',
  '10y' = '10y',
  'ytd' = 'ytd',
  'max' = 'max',
}

enum YF_INTERVAL {
  monthly = '1mo',
  daily = '1d',
  '30min' = '30m',
  yearly = '1y',
}

interface YahooFinanceQueryParams {
  range?: YF_RANGE;
  interval?: YF_INTERVAL;
  region?: string;
  lang?: string;
  includePrePost?: boolean;
  corsDomain?: string;
  '.tsrc'?: string;
}

const baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/';
const defaultParams: YahooFinanceQueryParams = {
  range: YF_RANGE['1mo'],
  interval: YF_INTERVAL.daily,
  region: 'US',
  lang: 'en-US',
  includePrePost: false,
  '.tsrc': 'finance',
};

const yahooFinanceMarketApi = {
  YF_RANGE,
  YF_INTERVAL,
  async chartQuery(ticker: string, config: YahooFinanceQueryParams = {}) {
    const queryUrl = `${baseUrl}${ticker}`;
    const query = axios.get(queryUrl, {
      params: {
        ...defaultParams,
        ...config,
      },
    });
    const { data } = await query;
    const result = data?.chart?.result ?? undefined;
    return result;
  },
};

export default yahooFinanceMarketApi;
