import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedChart } from '../models/redux/redux-models';

const initialSelectedState: SelectedChart = { selectedChart: 'HistoryChart' };

const selectedSlice = createSlice({
  name: 'detail',
  initialState: initialSelectedState,
  reducers: {
    setDetail(state: SelectedChart, action: PayloadAction<string>) {
      state.selectedChart = action.payload;
    },
  },
});

export const selectedActions = selectedSlice.actions;

export default selectedSlice.reducer;
