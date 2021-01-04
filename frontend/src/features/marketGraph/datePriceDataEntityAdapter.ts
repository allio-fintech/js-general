import { createEntityAdapter } from '@reduxjs/toolkit';
import { Decimal } from 'decimal.js';

export interface DatePriceDatum {
  id: string;
  date: Date;
  price: Decimal;
  assetType: string;
}

const datePriceDataEntityAdapter = createEntityAdapter<DatePriceDatum>({
  selectId: (datePrice) => datePrice.id,
  sortComparer: (a, b) => a.date.getTime() - b.date.getTime(),
});

export default datePriceDataEntityAdapter;
