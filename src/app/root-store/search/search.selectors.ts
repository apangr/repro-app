import { createSelector } from '@ngrx/store';
import { AppState } from '..';
const searchState = (state: AppState) => state.searchState;

//Creators Result
export const selectCreatorsResult = createSelector(
  searchState,
  (state) => state.search?.creatorsResult
);
//Posts Result
export const selectPostsResult = createSelector(
  searchState,
  (state) => state.search?.postsResult
);
//History
export const selectSearchHistory = createSelector(
  searchState,
  (state) => state.search?.searchHistory
);
