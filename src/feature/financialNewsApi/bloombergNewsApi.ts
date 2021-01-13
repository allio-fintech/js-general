import axios, { AxiosRequestConfig } from 'axios';
import { produce } from 'immer';

enum BloombergMarketFinanceNewsApiNewsList {
  'markets' = 'markets',
  'technology' = 'technology',
  'view' = 'view',
  'pursuits' = 'pursuits',
  'politics' = 'politics',
  'green' = 'green',
  'citylab' = 'citylab',
  'businessweek' = 'businessweek',
  'fixed-income' = 'fixed-income',
  'hyperdrive' = 'hyperdrive',
  'cryptocurrencies' = 'cryptocurrencies',
  'wealth' = 'wealth',
  'latest' = 'latest',
  'personalFinance' = 'personalFinance',
  'quickTake' = 'quickTake',
  'world' = 'world',
  'industries' = 'industries',
  'stocks' = 'stocks',
  'currencies' = 'currencies',
  brexit = 'brexit',
}

const BloombergMarketFinanceNewsApi = class {
  public static NewsList = BloombergMarketFinanceNewsApiNewsList;
  private static RapidApiHost = 'bloomberg-market-and-financial-news.p.rapidapi.com';

  private async generalQuery(config: AxiosRequestConfig) {
    const options = produce(config, (draftConfig) => {
      draftConfig.headers = draftConfig.headers || {};
      draftConfig.headers['x-rapidapi-key'] = process.env.RAPID_API_KEY;
      draftConfig.headers['x-rapidapi-host'] = BloombergMarketFinanceNewsApi.RapidApiHost;
    });

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (err) {
      throw err;
    }
  }

  public async getNewsList(id = BloombergMarketFinanceNewsApiNewsList.markets) {
    const config: AxiosRequestConfig = {
      url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list',
      method: 'GET',
      params: {
        id,
      },
    };

    return this.generalQuery(config);
  }
};

export default BloombergMarketFinanceNewsApi;
