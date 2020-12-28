import bloombergMarketApi from './bloombergMarketApi';

const main = async () => {
  const sp500Id = 'SPX:IND';
  const data = await bloombergMarketApi.bulkTimeSeries(sp500Id, {
    timeFrame: bloombergMarketApi.TIME_FRAME['5_YEAR'],
    period: bloombergMarketApi.PERIOD.daily,
  });

  console.log(data);
};

export default main;
