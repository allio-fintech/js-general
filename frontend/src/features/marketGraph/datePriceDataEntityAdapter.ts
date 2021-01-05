import { createEntityAdapter } from '@reduxjs/toolkit';
import { Decimal } from 'decimal.js';

export interface DatePriceDatum {
  id: string;
  date: string;
  price: Decimal;
  assetType: string;
}

const datePriceDataEntityAdapter = createEntityAdapter<DatePriceDatum>({
  selectId: (datePrice) => datePrice.id,
  sortComparer: (a, b) => Date.parse(a.date) - Date.parse(b.date),
});

export default datePriceDataEntityAdapter;
