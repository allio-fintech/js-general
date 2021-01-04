export const approximateUTCDateString = (date: Date) => {
  const hour = date.getUTCHours();
  if (24 - hour < 2) {
    date.setUTCHours(24, 0, 0, 0);
  }
  return date.toISOString().split('T')[0];
};

export const timestampToDate = (ts: number) => new Date(ts * 1000);
