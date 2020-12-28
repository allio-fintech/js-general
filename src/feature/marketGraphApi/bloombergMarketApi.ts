import axios from 'axios';

enum TIME_FRAME {
  '1_DAY' = '1_DAY',
  '1_MONTH' = '1_MONTH',
  '1_YEAR' = '1_YEAR',
  '5_YEAR' = '5_YEAR',
}

class bloombergMarketApi {
  public static TIME_FRAME = TIME_FRAME;

  public async bulkTimeSeries(id: string, timeFrame: TIME_FRAME) {
    const queryUrl = `https://www.bloomberg.com/markets/api/bulk-time-series/price/${id}?timeFrame=${timeFrame}`;
    const query = axios.get(queryUrl);
    const { data } = await query;
    return data;
  }
}

export default bloombergMarketApi;
