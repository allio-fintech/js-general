import BloombergMarketFinanceNewsApi from './bloombergNewsApi';

const main = async () => {
  const bloombergMarketFinanceNewsApi = new BloombergMarketFinanceNewsApi();
  const data = await bloombergMarketFinanceNewsApi.getNewsList(
    BloombergMarketFinanceNewsApi.NewsList.markets
  );
  console.log(JSON.stringify(data));
};

export default main;
