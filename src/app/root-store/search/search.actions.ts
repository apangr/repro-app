import { createAction, props } from '@ngrx/store';
import { PageInfo } from '@app/shared/models/page.interface';

export const searchCreators = createAction(
  '[Search] Get Creators',
  props<{ searchQuery: string; pageInfo: PageInfo }>()
);
export const searchCreatorsSuccess = createAction(
  '[Search] Get Creators Success',
  props<{ result: any[]; offset: number }>()
);
export const searchCreatorsFail = createAction(
  '[Search] Get Creators Fail',
  props<{ error: string }>()
);
export const searchPosts = createAction(
  '[Search] Get Posts',
  props<{ searchQuery: string; pageInfo: PageInfo }>()
);
export const searchPostsSuccess = createAction(
  '[Search] Get Posts Success',
  props<{ result: any[]; offset: number }>()
);
export const searchPostsFail = createAction(
  '[Search] Get Posts Fail',
  props<{ error: string }>()
);
export const clearSearchHistory = createAction('[Search] Clear Search History');
export const removeItemFromSearchHistory = createAction(
  '[Search] Remove Item From History',
  props<{ item: string }>()
);
