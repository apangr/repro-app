import * as SearchActions from './search.actions';
import { reducer as SearchReducer } from './search.reducer';
import { SearchState } from './search.reducer';
export { SearchEffects } from './search.effects';
import {
  selectCreatorsResult,
  selectPostsResult,
  selectSearchHistory,
} from './search.selectors';

export {
  SearchActions,
  SearchReducer,
  SearchState,
  selectCreatorsResult,
  selectPostsResult,
  selectSearchHistory,
};
