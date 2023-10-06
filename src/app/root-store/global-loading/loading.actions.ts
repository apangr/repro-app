import { createAction } from '@ngrx/store';

//Global loading
export const showGlobalLoading = createAction(
  '[Global loading] Show global loading'
);
export const hideGlobalLoading = createAction(
  '[Global loading] Hide global loading'
);
