import { createEntityAdapter } from '@reduxjs/toolkit';

const assetDataEntityAdapter = createEntityAdapter<{
  assetType: string;
  data: any;
}>({
  selectId: (obj) => obj.assetType,
  sortComparer: (a, b) => a.assetType.localeCompare(b.assetType),
});

export default assetDataEntityAdapter;
