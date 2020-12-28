// It seems that this method will get robot detect error
import axios from 'axios';

enum TIME_FRAME {
  '1_DAY' = '1_DAY',
  '1_MONTH' = '1_MONTH',
  '1_YEAR' = '1_YEAR',
  '5_YEAR' = '5_YEAR',
}

enum PERIOD {
  monthly = 'monthly',
  daily = 'daily',
}

// const oldUrl = 'https://www.bloomberg.com/markets/api/bulk-time-series/price/';
const newUrl = 'https://www.bloomberg.com/markets2/api/history/';

const bloombergMarketApi = {
  TIME_FRAME,
  PERIOD,
  async bulkTimeSeries(
    id: string,
    {
      timeFrame = TIME_FRAME['1_MONTH'],
      period = PERIOD.daily,
      volumePeriod,
    }: {
      timeFrame?: TIME_FRAME;
      period?: PERIOD;
      volumePeriod?: PERIOD;
    } = {}
  ) {
    const queryUrl = `${newUrl}${id}/`;
    const query = axios.get(queryUrl, {
      params: {
        timeFrame,
        period,
        volumePeriod,
      },
    });
    const { data } = await query;
    return data;
  },
};

export default bloombergMarketApi;
