import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RealState {
  array: string[];
}

const initialState: RealState = {
  array: [],
};

const stateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    changeCrypto(state: RealState, action: PayloadAction<string>) {
      const id = action.payload,
        array = state.array;
      if (!array.includes(id)) array.push(id);
      else array.splice(array.indexOf(id), 1);
    },
  },
});

const store = configureStore({
  reducer: { state: stateSlice.reducer },
});

export const stateActions = stateSlice.actions;

export default store;
