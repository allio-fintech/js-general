import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'features/redux/reducer';
import generateCsvUrl from 'features/csv/generateCsvUrl';

const generateCsvUrlThrunk = createAsyncThunk<
  string,
  void,
  { state: RootState }
>('marketGraph/generateCsvUrlStatus', async (_, { getState }) => {
  const {
    marketGraph: {
      marketGraphData: { csvColumnsOption, csvData },
    },
  } = getState();
  return generateCsvUrl({ data: csvData, columns: csvColumnsOption });
});

export default generateCsvUrlThrunk;
