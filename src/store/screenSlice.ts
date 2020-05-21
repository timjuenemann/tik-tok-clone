import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

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

interface ScreenState {
  videos: { [id: string]: VideoItem };
}

const initialState: ScreenState = {
  videos: {
    '1': {
      id: '1',
      username: 'timjuenemann',
      description: 'This is my cool tiktok',
      soundName: 'original sound - timjuenemann',
      videoURL: 'url...',
      likeCount: 10,
      commentCount: 0,
      shareCount: 37,
      liked: false,
    },
    '2': {
      id: '2',
      username: 'timjuenemann',
      description: 'This is my cool tiktok',
      soundName: 'original sound - timjuenemann',
      videoURL: 'url...',
      likeCount: 10,
      commentCount: 0,
      shareCount: 37,
      liked: false,
    },
  },
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    likeVideo: (state, action: PayloadAction<string>) => {
      const video = state.videos[action.payload];
      if (!video.liked) {
        video.liked = true;
        video.likeCount += 1;
      }
    },
    unlikeVideo: (state, action: PayloadAction<string>) => {
      const video = state.videos[action.payload];
      if (video.liked) {
        video.liked = false;
        video.likeCount -= 1;
      }
    },
  },
});

export const { likeVideo, unlikeVideo } = screenSlice.actions;

// Selectors
export const selectVideos = (state: RootState) => state.screen.videos;

export default screenSlice.reducer;
