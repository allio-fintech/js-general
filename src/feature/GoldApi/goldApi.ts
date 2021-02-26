import axios from 'axios';

export enum GoldApiMetal {
  gold = 'XAU',
  silver = 'XAG',
  platinum = 'XPT',
  palladium = 'XPD',
}

export enum CurrencyCode {
  USD = 'USD',
}

export class GoldApi {
  public static readonly GoldApiMetal = GoldApiMetal;
  public static readonly CurrencyCode = CurrencyCode;

  constructor(private readonly token = process.env.GOLDAPI_API_KEY) {}

  async getRatio({
    from,
    to,
    date,
  }: {
    from: GoldApiMetal | CurrencyCode;
    to: GoldApiMetal | CurrencyCode;
    date?: string; // optional historical date: YYYYMMDD
  }) {
    const url = `https://www.goldapi.io/api/${from}/${to}${date ? `/${date}` : ''}`;
    const response = await axios.get(url, {
      headers: {
        'x-access-token': this.token,
      },
    });
    return response.data;
  }
}

const goldApi = new GoldApi();
goldApi
  .getRatio({ from: GoldApi.GoldApiMetal.gold, to: GoldApi.CurrencyCode.USD })
  .then((data) => console.log(JSON.stringify(data)));
