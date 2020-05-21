import React from 'react';
import Video, { VideoItem } from './Video';
import useScreenDrag from '../common/hooks/screenDragHook';

const videoItem: VideoItem = {
  username: 'timjuenemann',
  description: 'This is my cool tiktok',
  soundName: 'original sound - timjuenemann',
  videoURL: 'url...',
  likeCount: 10,
  commentCount: 0,
  shareCount: 37,
};

function Screen() {
  const [screenRef] = useScreenDrag();

  return (
    <div>
      <div
        style={{
          height: 800,
          width: 450,
          backgroundColor: '#000',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        ref={screenRef}
      >
        <Video item={videoItem} color="red" />
        <Video item={videoItem} color="blue" />
        <Video item={videoItem} color="green" />
        <Video item={videoItem} color="purple" />
      </div>
    </div>
  );
}

export default Screen;
