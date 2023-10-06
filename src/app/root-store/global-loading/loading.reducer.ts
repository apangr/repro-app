import { createReducer, on } from '@ngrx/store';
import { GlobalLoadingActions } from '.';

export interface GlobalLoadingState {
  loading: boolean;
}

export const initialState: GlobalLoadingState = {
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(GlobalLoadingActions.showGlobalLoading, (state) => ({
    ...state,
    loading: true,
  })),
  on(GlobalLoadingActions.hideGlobalLoading, (state) => ({
    ...state,
    loading: false,
  }))
);
