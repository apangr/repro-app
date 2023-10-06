import { createSelector } from '@ngrx/store';
import { AppState } from '..';

const loadingState = (state: AppState) => state.globalLoading;

export const selectShowGlobalLoading = createSelector(
  loadingState,
  (state) => state.loading
);
