import { createSlice } from '@reduxjs/toolkit';
import { AddModal } from '../models/redux/redux-models';

const initialModal: AddModal = {
  addModalIsShown: true,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModal,
  reducers: {
    toggleAddModal(state: AddModal) {
      state.addModalIsShown = !state.addModalIsShown;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
