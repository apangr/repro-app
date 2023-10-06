import { createReducer, on } from '@ngrx/store';
import { SearchActions } from '.';

export interface SearchState {
  loaded: boolean;
  error?: Error | any;
  search: {
    searchHistory: string[];
    creatorsResult: any[];
    postsResult: any[];
  };
}

export const initialState: SearchState = {
  loaded: false,
  error: null,
  search: {
    searchHistory: [],
    creatorsResult: [],
    postsResult: [],
  },
};

export const reducer = createReducer(
  initialState,
  // Add query search to the search history
  on(SearchActions.searchCreators, (state, { searchQuery }) => {
    return {
      ...state,
      search: {
        ...state.search,
        searchHistory:
          searchQuery.length &&
          !state.search.searchHistory.find(
            (item) =>
              item.trim().toLocaleLowerCase() ===
              searchQuery.trim().toLocaleLowerCase()
          )
            ? [searchQuery, ...state.search.searchHistory]
            : [...state.search.searchHistory],
        creatorsResult: [],
      },
    };
  }),
  on(SearchActions.searchCreatorsSuccess, (state, { result, offset }) => {
    return {
      ...state,
      search: {
        ...state.search,
        creatorsResult: result,
      },
    };
  }),
  on(SearchActions.clearSearchHistory, (state) => {
    return {
      ...state,
      search: {
        ...state.search,
        searchHistory: [],
      },
    };
  }),
  on(SearchActions.removeItemFromSearchHistory, (state, action) => {
    const history = [...state.search.searchHistory];
    const index = history.findIndex(
      (item: string) =>
        item.trim().toLocaleLowerCase() ===
        action.item.trim().toLocaleLowerCase()
    );
    if (index < 0) {
      return state;
    }
    return {
      ...state,
      search: {
        ...state.search,
        searchHistory: [
          ...history.slice(0, index),
          ...history.slice(index + 1, history.length),
        ],
      },
    };
  })
);
