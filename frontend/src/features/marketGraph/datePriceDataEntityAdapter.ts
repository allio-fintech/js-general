import { createEntityAdapter } from '@reduxjs/toolkit';

export interface DatePriceDatum {
  id: string;
  date: string;
  price: string | number;
  assetType: string;
}

const datePriceDataEntityAdapter = createEntityAdapter<DatePriceDatum>({
  selectId: (datePrice) => datePrice.id,
  sortComparer: (a, b) => Date.parse(a.date) - Date.parse(b.date),
});

export default datePriceDataEntityAdapter;
