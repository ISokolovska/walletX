import { createSlice } from '@reduxjs/toolkit';
import options from './transactions-operations';

const initialState = {
  transactions: [],
  category: [],
  summary: [],
  loadingTrans: false,
  loadingSummary: false,
  loadingAddTrans: false,
  loadingCat: false,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: {
    [options.getCategory.pending]: state => {
      state.loadingCat = true;
    },
    [options.getCategory.fulfilled]: (state, { payload }) => {
      state.category = payload;
      state.loadingCat = false;
    },
    [options.getCategory.rejected]: state => {
      state.loadingCat = false;
    },
    [options.createTransaction.pending]: state => {
      state.loadingAddTrans = true;
    },
    [options.createTransaction.fulfilled]: (state, { payload }) => {
      state.transactions = payload.result.reverse();
      state.loadingAddTrans = false;
    },
    [options.createTransaction.rejected]: state => {
      state.loadingAddTrans = false;
    },
    [options.getTransactions.pending]: state => {
      state.loadingTrans = true;
    },
    [options.getTransactions.fulfilled]: (state, { payload }) => {
      state.transactions = payload.reverse();
      state.loadingTrans = false;
    },
    [options.getTransactions.rejected]: state => {
      state.loadingTrans = false;
    },
    [options.getTransactionSummary.pending]: state => {
      state.loadingSummary = true;
    },
    [options.getTransactionSummary.fulfilled]: (state, { payload }) => {
      state.summary = payload.reverse();
      state.loadingSummary = false;
    },
    [options.getTransactionSummary.rejected]: state => {
      state.loadingSummary = false;
    },
  },
});

export default transactionSlice.reducer;
