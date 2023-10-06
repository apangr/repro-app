import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from '.';
import { fromProfileActions } from './profile.actions';

export const PROFILE_FEATURE_KEY = 'profile';

export interface State {
  loaded: boolean;
  error?: Error | any;
  profile: any | null;
  profileConfig?: any;
  creatorData: {
    loading: boolean;
    error?: string;
    creator: any | null;
    activePlan?: any | null;
    isAnnual: boolean;
  };
  userPostLabels: {
    labels: any[];
    loading: boolean;
    error?: string;
    loadingCreate: boolean;
    errorCreate?: string;
  };
  followingCreators: {
    creators: any[];
    loading: boolean;
    error?: string;
    hasNextPage: boolean;
  };
  suggestedCreators: {
    creators: any[];
    loading: boolean;
    error?: string;
    hasNextPage: boolean;
  };
}

export interface ProfilePartialState {
  readonly [PROFILE_FEATURE_KEY]: State;
}

export const initialState: State = {
  // Additional entity state properties
  loaded: false,
  error: null,
  profile: null,
  creatorData: {
    loading: false,
    creator: null,
    activePlan: null,
    isAnnual: false,
  },
  userPostLabels: {
    labels: [],
    loading: false,
    loadingCreate: false,
  },
  followingCreators: {
    creators: [],
    loading: false,
    hasNextPage: false,
  },
  suggestedCreators: {
    creators: [],
    loading: false,
    hasNextPage: false,
  },
};

export const reducer = createReducer(
  initialState,
  on(fromProfileActions.loadProfileSuccess, (state, action) => {
    return {
      ...state,
      loaded: true,
      profile: action.profile,
    };
  }),
  on(fromProfileActions.loadProfileFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(ProfileActions.logout, () => {
    return { ...initialState };
  }),
  on(fromProfileActions.updateProfileAvatarImage, (state) => {
    return {
      ...state,
      loaded: false,
    };
  }),
  on(fromProfileActions.updateProfileFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(ProfileActions.userPostLabels, (state) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        loading: true,
        error: '',
      },
    };
  }),
  on(ProfileActions.userPostLabelsSuccess, (state, { labels }) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        loading: false,
        labels,
      },
    };
  }),
  on(ProfileActions.userPostLabelsFail, (state, { error }) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        loading: false,
        error,
      },
    };
  }),
  on(ProfileActions.createNewPostLabel, (state) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        loadingCreate: true,
        errorCreate: '',
      },
    };
  }),
  on(ProfileActions.createNewPostLabelSuccess, (state, { label }) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        labels: [...state.userPostLabels.labels, { ...label }],
        loadingCreate: false,
        errorCreate: '',
      },
    };
  }),
  on(ProfileActions.createNewPostLabelFail, (state, { error }) => {
    return {
      ...state,
      userPostLabels: {
        ...state.userPostLabels,
        loadingCreate: false,
        errorCreate: error,
      },
    };
  }),
  // Creator
  on(ProfileActions.loadCreatorData, (state) => {
    return {
      ...state,
      creatorData: {
        ...state.creatorData,
        loading: true,
      },
    };
  }),
  on(ProfileActions.loadCreatorDataSuccess, (state, { creator }) => {
    return {
      ...state,
      creatorData: {
        ...state.creatorData,
        loading: false,
        creator,
        activePlan: creator.subscribedStreamingPackage,
        isAnnual: creator.subscribedStreamingPackageIsAnnual ?? false,
      },
    };
  }),
  on(ProfileActions.loadCreatorDataFail, (state, { error }) => {
    return {
      ...state,
      creatorData: {
        ...state.creatorData,
        loading: false,
        error,
      },
    };
  }),
  on(
    ProfileActions.setPricePerMonthSuccess,
    (state, { baseSubscriptionPrice }) => {
      return {
        ...state,
        creatorData: {
          ...state.creatorData,
          creator: {
            ...state.creatorData.creator,
            baseSubscriptionPrice,
          },
        },
      };
    }
  ),
  // Profile Config
  on(ProfileActions.getProfileConfigSuccess, (state, { profileConfig }) => {
    return {
      ...state,
      profileConfig,
    };
  }),
  on(ProfileActions.getProfileConfigFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  // Update Profile Config
  on(ProfileActions.updateProfileConfigSuccess, (state, { profileConfig }) => {
    return {
      ...state,
      profileConfig,
    };
  }),
  on(ProfileActions.updateProfileConfigFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);
