import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ParsedUrlQuery } from 'querystring';
/* eslint-disable no-param-reassign */

interface ServerState {
  pathName: string;
  query: ParsedUrlQuery;
}

export interface GlobalServerState {
  server: ServerState;
}

const serverSlice = createSlice({
  name: 'server',
  initialState: { pathName: '', query: {} } as ServerState,
  reducers: {
    setPathAndQuery(state, action: PayloadAction<Partial<ServerState>>) {
      state.pathName = action.payload.pathName ?? state.pathName;
      state.query = action.payload.query ?? state.query;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<string, PayloadAction<GlobalServerState>>(
      HYDRATE,
      (_, action) => {
        return action.payload.server;
      }
    );
  },
});

export default serverSlice.reducer;
export { HYDRATE };
export const { setPathAndQuery } = serverSlice.actions;
