import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';
import { normalize, schema } from 'normalizr';

export interface VideoItem {
  id: string;
  username: string;
  description: string;
  soundName: string;
  videoURL: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  liked: boolean;
}

const videoEntity = new schema.Entity('videos');

interface ScreenState {
  activeView: number;
  videos: {
    entities: {
      videos: {
        [id: string]: VideoItem;
      };
    };
    result: string[];
  };
}

const initialState: ScreenState = {
  activeView: 0,
  videos: normalize(require('../assets/videos.json'), [videoEntity]),
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    likeVideo: (state, action: PayloadAction<string>) => {
      const video = state.videos.entities.videos[action.payload];
      if (!video.liked) {
        video.liked = true;
        video.likeCount += 1;
      }
    },
    unlikeVideo: (state, action: PayloadAction<string>) => {
      const video = state.videos.entities.videos[action.payload];
      if (video.liked) {
        video.liked = false;
        video.likeCount -= 1;
      }
    },
    setActiveView: (state, action: PayloadAction<number>) => {
      state.activeView = action.payload;
    },
  },
});

export const { likeVideo, unlikeVideo, setActiveView } = screenSlice.actions;

// Selectors
export const selectVideos = (state: RootState) =>
  state.screen.videos.entities.videos;
export const selectSortedVideoIds = (state: RootState) =>
  state.screen.videos.result;
export const selectActiveView = (state: RootState) => state.screen.activeView;

export const selectActiveVideoId = createSelector(
  selectSortedVideoIds,
  selectActiveView,
  (sortedIds, activeView) => sortedIds[activeView]
);

export default screenSlice.reducer;
