import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface queryState {
  name: string;
}

const initialState: queryState = {
  name:'none',
};

export const queryPort = createSlice({
  name: "query",
  initialState,
  reducers: {
    changeQuery(state:queryState,  action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { changeQuery } = queryPort.actions;
export default queryPort;
